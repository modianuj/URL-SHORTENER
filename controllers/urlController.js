const shortid = require('shortid');
const url = require('../model/urlModel');

module.exports = {
  home: async (req, res) => {
    res.render('home');
  },
};

module.exports.createUrl = async (req, res) => {
  try {
    let full_url = req.body.full_url;
    if (!full_url) {
      req.flash('error', 'Provide a Valid Url');
      console.log(`error to find url`);
      return res.redirect('/');
    }
    const existsUrl = await url.findOne({ full_url });

    if (existsUrl) {
      res.render('home', {
        // show_url: `http://localhost:1923/${existsUrl.short_url}`,
        show_url: existsUrl,
      });
    } else {
      const short_url = shortid.generate();
      url.create(
        {
          full_url: req.body.full_url,
          short_url: short_url,
        },
        (error, record) => {
          if (error) {
            console.log(`error to generate `);
          }
          return res.render('home', {
            // show_url: `http://localhost:1923/${record.short_url}`,
            show_url: record,
          });
        }
      );
    }
  } catch (error) {
    console.log(`error in catch`);
    return res.sendStatus(404);
  }
};

module.exports.urlHandler = (req, res) => {
  url.findOne({ short_url: req.params.show_url }, (error, record) => {
    if (error || record == null) {
      res.redirect('back');
    } else {
      return res.redirect(record.full_url);
    }
  });
};
