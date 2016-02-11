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

            var title, price;

            var i = 0;

            while (i <= program.limit - 1) {

                // get title
                $('a div div span.title').eq(i).filter(function(){
                    var data = $(this);

                    title = data.text();
                });

                // get normal and current price
                $('.search_price.responsive_secondrow').eq(i).filter(function(){
                    var data = $(this);

                    price = data.text();

                    // format prices for display
                    var prices = formattedPrice(price);

                    if (prices.length > 1) {
                        price = chalk.gray("$" + prices[0]) + "  " + chalk.green(prices[1]);
                    } else {
                        price = "$" + prices[0];
                    }
                });

                // log output
                console.log(title + ": " + price);

                i++;
            }
        }
    });
};

module.exports = steamScraper;
