#! /usr/bin/env node

/*
 * gog-scraper
 * Copyright (c) 2016 Jeff Minnear
 * Licensed under the MIT license.
 */

'use strict';

const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');

function gogScraper(args) {
    var gogSearchUrl = 'http://www.gog.com/games/ajax/filtered?limit=' + args.limit + '&search=';
    var gameSearchUrl = gogSearchUrl + encodeURIComponent(args.title);

    var results = [];

    return new Promise((resolve, reject) => {
        request(gameSearchUrl, function(error, response, body){
            if ( error != null ) {
                return reject(error);
            }

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
                    results.push(searchResult);
                }
            }

            resolve(results);
        });
    });
};

module.exports = gogScraper;
