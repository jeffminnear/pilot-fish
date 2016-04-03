/*
 * pf-scrapers
 * https://github.com/jeffminnear/pf-scrapers
 *
 * Copyright (c) 2016 Jeff Minnear
 * Licensed under the MIT license.
 */

'use strict';

const amazon = require('./amazon-scraper');
const gog = require('./gog-scraper');
const gm = require('./green-man-scraper');
const steam = require('./steam-scraper');

const scrapers = [steam, gm, gog, amazon];

module.exports = scrapers;
