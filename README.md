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

If the specific game you're looking for doesn't appear in the results, try making the title more specific and increasing the limit.

## Contributing
If you contribute code to this project, you are implicitly allowing your code to be distributed under the MIT license. You are also implicitly verifying that all code is your original work.

## Release History
2016-03-28 v0.1.0 Initial release.

## License
Copyright (c) 2016 Jeff Minnear  
Licensed under the MIT license.
