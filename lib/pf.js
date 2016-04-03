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
const clear = require('clear');
const chalk = require('chalk');

const scrapers = require('pf-scrapers');
const best = require('./best-price');

var colorLegend = "Prices in " + chalk.green("green") + " are current sale prices, shown next to their normal price in " + chalk.gray("gray") + ".";
var divider =     "==================================================================================";

var notes = "If the game you're looking for doesn't show up in results, "
          + "try increasing the limit. For example:\n\n  $ pf -s 'dark souls' 5"
          ;

program
    .version('1.0.2')
    .option('-b, --best', 'only display the best price for each title; if multiple stores have the item for the same price, only the first entry processed will be displayed')
    .option('-s, --sale', 'only display items that are on sale')
    .arguments('<title> [limit]')
    .action(function (title, limit) {
        program.title = title;
        program.limit = limit;
    });

program.on('--help', () => console.log(notes));

program.parse(process.argv);

if (program.title) {
    clear();
    console.log(colorLegend + "\n" + divider);

    var options = {
        best: program.best,
        sale: program.sale
    };

    var args = {
        limit: program.limit == null ? 1 : program.limit,
        title: program.title
    };

    var promises = scrapers;

    Promise.all(promises.map((x) => x(args)))
        .then((results) => {
            results = _.flatten(results);
            best(options, results);
        });
} else {
    console.log(chalk.red("Sorry, you must specify a title\nFor example: pf 'dark souls'"));
}
