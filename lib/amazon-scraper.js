#! usr/bin/env node

/*
 * amazon-scraper
 * Copyright (c) 2016 Jeff Minnear
 * Licensed under the MIT license.
 */

'use strict';

var program = require('commander');
var request = require('request');
var cheerio = require('cheerio');
const chalk = require('chalk');
var colorLegend = "Prices in " + chalk.green("green") + " are current sale prices, shown next to their normal price in " + chalk.gray("gray") + ".";
var amazonSearchUrl = "http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dvideogames&field-keywords=";

program
    .version('0.0.1')
    .option('-t, --title <string>', 'the title of the game you want to price check', String)
    .option('-l, --limit <n>', 'the number of results you want to see (default is 1)', Number)
    .parse(process.argv);

var gameSearchUrl = amazonSearchUrl + encodeURIComponent(program.title);
console.log(colorLegend);
