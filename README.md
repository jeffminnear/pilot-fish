# pilot-fish

A Node.js command line utility to check the prices of PC games on various sites

## Installation
`$ npm install -g pilot-fish`

## Usage
The program is called using the `pf` command with the following structure:

`$ pf [options] <title> [limit]`

The options available are:
```
    -h, --help     output usage information
    -V, --version  output the version number
    -b, --best     only display the best price for each title; if multiple stores have the item for the same price, only the first entry processed will be displayed
    -s, --sale     only display items that are on sale
```

`title` represents a string that will be passed as the search query to each webpage.

The `limit` is the number of results you want to see from each store; The default is 1.

If the game you're looking for doesn't appear in the results, try making the title more specific and increasing the limit.

## Examples
```
$ pf skyrim

#=> The Elder Scrolls V: Skyrim: $19.99 from steam
#=> The Elder Scrolls V: Skyrim®: $19.99 from greenmangaming.com
#=> The Elder Scrolls V: Skyrim: $19.99 from amazon.com
```

Note that gog.com does not carry AAA titles (with a few exceptions) and may not return a result.

```
$ pf -s 'dark souls' 4

#=> Dark Souls II: $49.99  $22.99 from greenmangaming.com
```

When a game is on sale, the normal price will be displayed first in gray, followed by the current sale price in green.

## Release History
2016-04-18 v1.1.0 Bug fixes.
2016-03-28 v1.0.2 Initial release.

## Contributing
This project is licensed under the MIT License. If you contribute code to this project, you are implicitly allowing that code to be published under the MIT License.

## License
Copyright (c) 2016 Jeff Minnear  
Licensed under the MIT license.
