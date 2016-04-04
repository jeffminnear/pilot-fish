
/*
 * best-price
 * Copyright (c) 2016 Jeff Minnear
 * Licensed under the MIT license.
 */

const chalk = require('chalk');


function sortByTitle(options, objArray) {

    while (objArray.length > 0) {
        var matches = [];

        var string = objArray[0].simplifiedTitle;

        for (var i = 0; i < objArray.length; i++) {
            if (string === objArray[i].simplifiedTitle) {
                matches.push(objArray[i]);
                objArray.splice(i, 1);
                i--;
            }
        }

        matches = matches.sort(byPrice);

        for (var i = 0; i < matches.length; i++) {
            if (options.best && i > 0) { break; }

            var match = matches[i];
            if (match.normalPrice) {
                console.log(chalk.black.bold(match.title) + ": " + chalk.gray(match.normalPrice) + "  " + chalk.green(match.price) + " from " + chalk.blue(match.store));
            } else {
                if (options.sale) { continue; }
                console.log(chalk.black.bold(match.title) + ": " + match.price + " from " + chalk.blue(match.store));
            }
        }
    }
};

var byPrice = function byPrice(a, b) {
    a = parseFloat(a.price.replace("$", ""));
    b = parseFloat(b.price.replace("$", ""));

    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    return 0;
};

module.exports = sortByTitle;
