#! /usr/bin/env node

/*
 * green-man-scraper
 * Copyright (c) 2016 Jeff Minnear
 * Licensed under the MIT license.
 */

'use strict';

const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');

function gmScraper(args) {
    var greenManSearchUrl = "http://www.greenmangaming.com/search/?q=";
    var gameSearchUrl = greenManSearchUrl + encodeURIComponent(args.title);

    var results = [];

    return new Promise ((resolve, reject) => {
        request(gameSearchUrl, function(error, response, html) {
            if (error != null) {
                return reject(error);
            }

            var $ = cheerio.load(html);

            var i = 0;

            while (i <= args.limit - 1) {

                //create search result object
                var searchResult = {
                    title: null,
                    price: null,
                    normalPrice: null,
                    store: 'greenmangaming.com'
                };

                // get title
                $('h2.notranslate').eq(i).filter(function(){
                    var data = $(this);

                    searchResult.title = data.text().trim();
                });

                // get current price
                $('strong.curPrice').eq(i).filter(function(){
                    var data = $(this);

                    searchResult.price = data.text().trim();
                });

                // get normal price if item is on sale
                $('li.border-container.clearfix div.formats a.format div.price').eq(i).filter(function(){

                    var parent = $(this);

                    var child = parent.children().last();

                    if (child.is('span')) {
                        searchResult.normalPrice = child.text().trim();
                    }

                });

                if (searchResult.title) {
                    results.push(searchResult);
                }

                i++;
            }

            resolve(results);
        });
    });
};

module.exports = gmScraper;
