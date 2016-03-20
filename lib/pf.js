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
var divider =     "==================================================================================";


program
    .version('0.0.1')
    .arguments('<title> [limit]')
    .action(function (title, limit) {
        program.title = title;
        program.limit = limit;
    });

program.parse(process.argv);

if (program.title) {
    console.log(colorLegend + "\n" + divider);
    amazon(program);
    gm(program);
    gog(program);
    steam(program);
} else {
    console.log(chalk.red("Sorry, you must specify a title\nFor example: pf 'dark souls'"));
}
