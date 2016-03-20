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

            // parse JSON object for game info
            for (var i = 0; i < products.length; i++) {
                // create search result object
                var searchResult = {
                    title: null,
                    price: null,
                    normalPrice: null,
                    store: 'gog.com'
                };

                searchResult.title = products[i].title.trim();
                searchResult.price = '$' + products[i].price.amount;
                // only assign value of normalPrice if game is on sale
                if (products[i].price.isDiscounted) {
                    searchResult.normalPrice = '$' + products[i].price.baseAmount;
                }

                if (searchResult.title) {
                    // log output
                    if (searchResult.normalPrice) {
                        console.log(chalk.bgWhite(chalk.black.bold(searchResult.title) + ": " + chalk.gray(searchResult.normalPrice) + "  " + chalk.green(searchResult.price) + " from " + chalk.blue(searchResult.store)));
                    } else {
                        console.log(chalk.bgWhite(chalk.black.bold(searchResult.title) + ": " + searchResult.price + " from " + chalk.blue(searchResult.store)));
                    }
                }
            }
        }
    });
};

module.exports = gogScraper;
