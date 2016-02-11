#! /usr/bin/env node

/*
 * pilot-fish
 * https://github.com/jeffminnear/pilot-fish
 *
 * Copyright (c) 2016 Jeff Minnear
 * Licensed under the MIT license.
 */

'use strict';

var program = require('commander');
var amazon = require('./amazon-scraper');
var gm = require('./green-man-scraper');
var gog = require('./gog-scraper');
var steam = require('./steam-scraper');

const chalk = require('chalk');
var colorLegend = "Prices in " + chalk.green("green") + " are current sale prices, shown next to their normal price in " + chalk.gray("gray") + ".";


program
    .version('0.0.1')
    .option('-t, --title <string>', 'the title of the game you want to price-check', String)
    .option('-l, --limit <n>', 'the number of results you want to see (default is 1)', Number)
    .parse(process.argv);

console.log(colorLegend);
amazon(program);
gm(program);
gog(program);
steam(program);
