#! /usr/bin/env node

/*
 * green-man-scraper
 * Copyright (c) 2016 Jeff Minnear
 * Licensed under the MIT license.
 */

'use strict';

var request = require('request');
var cheerio = require('cheerio');
const chalk = require('chalk');

function gmScraper(program) {
    var greenManSearchUrl = "http://www.greenmangaming.com/search/?q=";
    var gameSearchUrl = greenManSearchUrl + encodeURIComponent(program.title);

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
};

module.exports = gmScraper;
