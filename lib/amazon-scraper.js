#! /usr/bin/env node

/*
 * amazon-scraper
 * Copyright (c) 2016 Jeff Minnear
 * Licensed under the MIT license.
 */

'use strict';

const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');

function amazonScraper(args) {
    var query = encodeURIComponent(args.title);
    var gameSearchUrl = "http://www.amazon.com/s/ref=sr_nr_p_n_feature_seven_br_0?fst=as%3Aoff&rh=n%3A468642%2Cn%3A229575%2Cn%3A4924894011%2Ck%3A" + query +  "%2Cp_n_feature_seven_browse-bin%3A7990461011&keywords=" + query + "&ie=UTF8&qid=1455028530&rnid=7990454011";

    var results = [];

    return new Promise((resolve, reject) => {
        request(gameSearchUrl, function(error, response, html) {
            if (error != null) {
                return reject(error);
            }

            var $ = cheerio.load(html);

            var $noMatch = $(':contains("did not match any products")');

            if ($noMatch[0]) { return; }

            var i = 0;

            while (i <= args.limit - 1) {

                // create search result object
                var searchResult = {
                    title: null,
                    price: null,
                    normalPrice: null,
                    store: 'amazon.com'
                };

                // get title
                $('h2.s-access-title').eq(i).filter(function(){
                    var data = $(this);
                    searchResult.title = data.text().replace(/\[.*\]/g, '').trim(); // removes [Online Game Code], [Digital Download], etc. from title
                });

                // get current price
                $('li#result_' + i).filter(function(){
                    var list_result = $(this);
                    var data = list_result.find('span.a-size-base.a-color-price.s-price.a-text-bold').first();

                    searchResult.price = data.text().trim();
                });

                // get normal price if item is on sale
                $('li#result_' + i + '.s-table-twister-row-no-border').filter(function(){
                    var list_result = $(this);
                    var data = list_result.find('span.a-size-small.a-color-secondary.a-text-strike').first();

                    if (data) {
                        searchResult.normalPrice = data.text().trim();
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

module.exports = amazonScraper;
