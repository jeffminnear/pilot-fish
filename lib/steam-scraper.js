#! /usr/bin/env node

/*
 * steam-scraper
 * https://github.com/jeffminnear/steam-scraper
 *
 * Copyright (c) 2016 Jeff Minnear
 * Licensed under the MIT license.
 */

'use strict';

var program = require('commander');
var request = require('request');
var cheerio = require('cheerio');
const chalk = require('chalk');
var colorLegend = "Prices in " + chalk.green("green") + " are current sale prices, shown next to their normal price in " + chalk.gray("gray") + ".";
var steamSearchUrl = "http://store.steampowered.com/search/?snr=1_7_7_151_12&term=";

program
    .version('0.0.1')
    .option('-t, --title <string>', 'the title of the game you want to price-check', String)
    .option('-l, --limit <n>', 'the number of results you want to see (default is 1)', Number)
    .parse(process.argv);


var formattedPrice = function formattedPrice(price) {
    price.trim();
    var prices = price.split("$");
    prices.shift();

    return prices;
};

var gameSearchUrl = steamSearchUrl + encodeURIComponent(program.title);
console.log(colorLegend);

request(gameSearchUrl, function(error, response, html){
    if (!error) {
        var $ = cheerio.load(html);

        var title, price;

        var i = 0;

        while (i <= program.limit - 1) {

            $('a div div span.title').eq(i).filter(function(){
                var data = $(this);

                title = data.text();
            });

            $('.search_price.responsive_secondrow').eq(i).filter(function(){
                var data = $(this);

                price = data.text();

                var prices = formattedPrice(price);

                if (prices.length > 1) {
                    price = chalk.gray("$" + prices[0]) + "  " + chalk.green(prices[1]);
                } else {
                    price = "$" + prices[0];
                }
            });

            console.log(title + ": " + price);

            i++;
        }
    }
});
