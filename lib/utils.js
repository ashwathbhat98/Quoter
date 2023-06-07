const fs = require('fs');
const quotesDB = require('../quotes.json');
const chalk = require('chalk');

exports.appendJSON = async function(q) {
  const outputFilename = '../quotes.json';

  try {
    await fs.writeFile(outputFilename, JSON.stringify(q, null, 4));
    console.log('JSON saved to', outputFilename);
  } catch (err) {
    console.error(err);
  }
};

exports.randomIndex = function(len) {
  return Math.floor(Math.random() * len);
};

module.exports = async function getAllQuotes(json) {
  const htmlString = json.toString();
  const parsedHTML = await $.load(htmlString);
  const quote = [];
  parsedHTML('.bqQuoteLink').map(function(i, foo) {
    foo = $(foo);
    quote.push(foo.text());
  });

  const auth = [];
  parsedHTML('.bq-aut').map(function(i, foo) {
    foo = $(foo);
    auth.push(foo.text());
  });

  const quotes = [];
  for (let i = 0; i < quote.length; i++) {
    quotes.push({
      "quote": quote[i],
      "author": auth[i]
    });
    quotesDB.push({
      "quote": quote[i],
      "author": auth[i]
    });
  }

  await appendJSON(quotesDB);

  return quotes;
};

exports.printQuote = function(q, a) {
  console.log([
    '',
    chalk.yellow(q),
    '        -- ',
    chalk.red(a),
    ''
  ].join('\n'));
};