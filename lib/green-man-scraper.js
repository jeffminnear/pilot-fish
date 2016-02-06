#! /usr/bin/env node

/*
 * green-man-scraper
 * Copyright (c) 2016 Jeff Minnear
 * Licensed under the MIT license.
 */

'use strict';

var program = require('commander');
var request = require('request');
var cheerio = require('cheerio');
const chalk = require('chalk');
var colorLegend = "Prices in " + chalk.green("green") + " are current sale prices, shown next to their normal price in " + chalk.gray("gray") + ".";
var greenManSearchUrl = "http://www.greenmangaming.com/search/?q=";

program
    .version('0.0.1')
    .option('-t, --title <string>', 'the title of the game you want to price check', String)
    .option('-l, --limit <n>', 'the number of results you want to see (default is 1)', Number)
    .parse(process.argv);


var gameSearchUrl = greenManSearchUrl + encodeURIComponent(program.title);
console.log(colorLegend);

request(gameSearchUrl, function(error, response, html) {
    if (!error) {
        var $ = cheerio.load(html);

        var title, currentPrice, normalPrice;

        var i = 0;

        while (i <= program.limit - 1) {

            // get title
            $('h2.notranslate').eq(i).filter(function(){
                var data = $(this);

                title = data.text();
            });

            // get current price
            $('strong.curPrice').eq(i).filter(function(){
                var data = $(this);

                currentPrice = data.text();
            });

            // get normal price if item is on sale
            normalPrice = null;
            $('li.border-container.clearfix div.formats a.format div.price').eq(i).filter(function(){

                var parent = $(this);

                var child = parent.children().last();

                if (child.is('span')) {
                    normalPrice = child.text();
                }

            });

            // log output
            if (normalPrice !== null) {
                console.log(title.trim() + ": " + chalk.gray(normalPrice.trim()) + "  " + chalk.green(currentPrice.trim()));
            } else {
                console.log(title.trim() + ": " + currentPrice.trim());
            }

            i++;
        }
    }
});
