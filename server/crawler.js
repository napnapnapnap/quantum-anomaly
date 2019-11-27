import {JSDOM} from 'jsdom';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const urlRegex = /href="\/(.*?)"/g;
const pages = [];

const skipped = [
  'manifest.json',
  'favicon.ico',
  'styles/main.css',
  'auth/google',
  'eve-fitting-simulator',
  ''
];

async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function getPage(url = 'https://quantum-anomaly.herokuapp.com/') {
  if (pages.includes(url)) return;
  if (url !== 'https://quantum-anomaly.herokuapp.com/') pages.push(url);

  console.log(`Getting ${url}`);

  return JSDOM.fromURL(url, {
    resources:  'usable',
    runScripts: 'dangerously'
  }).then(async dom => {
    await wait(1000);
    const domSerialized = dom.serialize();
    const matches = domSerialized.matchAll(urlRegex);
    for (const match of matches) {
      if (!skipped.includes(match[1]))
        await getPage(`https://quantum-anomaly.herokuapp.com/${match[1]}`);
    }
  });
}

(async function () {
  await getPage();
  console.log(pages.join('\n'));
})();
