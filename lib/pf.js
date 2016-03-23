#! /usr/bin/env node

/*
 * pilot-fish
 * https://github.com/jeffminnear/pilot-fish
 *
 * Copyright (c) 2016 Jeff Minnear
 * Licensed under the MIT license.
 */

'use strict';

const _ = require('lodash');
const program = require('commander');
const amazon = require('./amazon-scraper');
const gm = require('./green-man-scraper');
const gog = require('./gog-scraper');
const steam = require('./steam-scraper');
const clear = require('clear');
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
    clear();
    console.log(colorLegend + "\n" + divider);

    var args = {
        limit: program.limit == null ? 1 : program.limit,
        title: program.title
    };

    var promises = [ steam, gog, amazon, gm ];
    // gm(program);
    // gog(program);
    Promise.all(promises.map((x) => x(args)))
        .then((results) => {
            results = _.flatten(results);
            console.log(results);
        });
} else {
    console.log(chalk.red("Sorry, you must specify a title\nFor example: pf 'dark souls'"));
}
