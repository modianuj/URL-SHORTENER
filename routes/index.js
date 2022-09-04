const express = require('express');

const urlController = require('../controllers/urlController');

const routes = express.Router();

routes.get('/', urlController.home);
routes.post('/shortenUrl', urlController.createUrl);
routes.get('/:show_url', urlController.urlHandler);

module.exports = routes;
