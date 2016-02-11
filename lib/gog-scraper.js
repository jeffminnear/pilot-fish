#! /usr/bin/env node

/*
 * gog-scraper
 * Copyright (c) 2016 Jeff Minnear
 * Licensed under the MIT license.
 */

'use strict';

var request = require('request');
var cheerio = require('cheerio');
const chalk = require('chalk');

function gogScraper(program) {
    if (!program.limit) { program.limit = 1; }
    var gogSearchUrl = 'http://www.gog.com/games/ajax/filtered?limit=' + program.limit + '&search=';
    var gameSearchUrl = gogSearchUrl + encodeURIComponent(program.title);

    request(gameSearchUrl, function(error, response, body){
        if (!error) {
            var json = JSON.parse(body);
            var products = json.products;
            var title, price, normalPrice;

            // parse JSON object for game info
            for (var i = 0; i < products.length; i++) {
                normalPrice = undefined;
                title = products[i].title;
                price = products[i].price.amount;
                // only assign value of normalPrice if game is on sale
                if (products[i].price.isDiscounted) {
                    normalPrice = products[i].price.baseAmount;
                }

                // log output
                if (normalPrice) {
                    console.log(title + ": " + chalk.gray(normalPrice) + "  " + chalk.green(price));
                } else {
                    console.log(title + ": " + price);
                }
            }
        }
    });
};

module.exports = gogScraper;
