
// group together entries from different stores
var simplifyString = function simplifyString(string) {
    return string.toLowerCase().split(/\W/).filter(function(e) { return e; }).join(' ');
};

var compareStrings = function compareStrings(array) {

    while (array.length > 0) {
        var matches = [];

        var string = simplifyString(array[0]);

        for (var i = 0; i < array.length; i++) {
            if (string === simplifyString(array[i])) {
                matches.push(array[i]);
                array.splice(i, 1);
                i--;
            }
        }

        console.log(matches);
    }
};

// for testing
array = [   'Dark Souls - Prepare to Die Edition',
            'Dark Souls™ - Prepare To Die Edition',
            'Dark Souls: Prepare to Die Edition™',
            'Dark Souls II',
            'Dark Souls II - Scholar of the First Sin',
            'Dark Souls II: Scholar Of The First Sin',
            'Dark Souls II™ - Scholar of the First Sin'
        ];
