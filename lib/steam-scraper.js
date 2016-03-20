#! /usr/bin/env node

/*
 * steam-scraper
 * Copyright (c) 2016 Jeff Minnear
 * Licensed under the MIT license.
 */

'use strict';

var request = require('request');
var cheerio = require('cheerio');
const chalk = require('chalk');

function steamScraper(program) {
    if (!program.limit) { program.limit = 1; }
    var steamSearchUrl = "http://store.steampowered.com/search/?snr=1_7_7_151_12&term=";

    var formattedPrice = function formattedPrice(price) {
        price.trim();
        var prices = price.split("$");
        prices.shift();

        return prices;
    };

    var gameSearchUrl = steamSearchUrl + encodeURIComponent(program.title);

    request(gameSearchUrl, function(error, response, html){
        if (!error) {
            var $ = cheerio.load(html);

            var i = 0;

            while (i <= program.limit - 1) {

                // create search result object
                var searchResult = {
                    title: null,
                    price: null,
                    normalPrice: null,
                    store: 'steam'
                };

                // get title
                $('a div div span.title').eq(i).filter(function(){
                    var data = $(this);

                    searchResult.title = data.text();
                });

                // get normal and current price
                $('.search_price.responsive_secondrow').eq(i).filter(function(){
                    var data = $(this);

                    var price = data.text();

                    // format prices for display
                    var prices = formattedPrice(price);

                    if (prices.length > 1) {
                        searchResult.normalPrice = "$" + prices[0];
                        searchResult.price = "$" + prices[1].trim();
                    } else {
                        searchResult.price = "$" + prices[0].trim();
                    }
                });

                if (searchResult.title) {
                    // log output
                    if (searchResult.normalPrice) {
                        console.log(chalk.bgWhite(chalk.black.bold(searchResult.title) + ": " + chalk.gray(searchResult.normalPrice) + "  " + chalk.green(searchResult.price) + " from " + chalk.blue(searchResult.store)));
                    } else {
                        console.log(chalk.bgWhite(chalk.black.bold(searchResult.title) + ": " + searchResult.price + " from " + chalk.blue(searchResult.store)));
                    }
                }

                i++;
            }
        }
    });
};

module.exports = steamScraper;
