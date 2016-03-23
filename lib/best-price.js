

const chalk = require('chalk');

// group together entries from different stores
var simplifyString = function simplifyString(string) {
    return string.toLowerCase().split(/\W/).filter(function(e) { return e; }).join(' ');
};

// this will eventually take an array of searchResult objects
// it will call the simplifyString() function on array[i].title
// it will then loop through the matches and
// console.log(matches[i].title + ": " + chalk.gray(matches[i].normalPrice) + "  " + chalk.green(matches[i].price) + " at " + matches[i].store)
function sortByTitle(objArray) {

    while (objArray.length > 0) {
        var matches = [];

        var string = simplifyString(objArray[0].title);

        for (var i = 0; i < objArray.length; i++) {
            if (string === simplifyString(objArray[i].title)) {
                matches.push(objArray[i]);
                objArray.splice(i, 1);
                i--;
            }
        }

        matches = matches.sort(byPrice);

        for (var i = 0; i < matches.length; i++) {
            var match = matches[i];
            if (match.normalPrice) {
                console.log(chalk.bgWhite(chalk.black.bold(match.title) + ": " + chalk.gray(match.normalPrice) + "  " + chalk.green(match.price) + " from " + chalk.blue(match.store)));
            } else {
                console.log(chalk.bgWhite(chalk.black.bold(match.title) + ": " + match.price + " from " + chalk.blue(match.store)));
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
