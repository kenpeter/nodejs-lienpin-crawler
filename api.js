/*
// fetch
const fetch = require('node-fetch');
// console colors
const colors = require('colors');

// exports search func
// key, default page == 0
exports.search = (key, page = 0) => {
  // const url
  // encode uri
  // leipin/zhaopin/key&page&searchbar
  const url = encodeURI(`https://www.liepin.com/zhaopin/?key=${key}&curPage=${page}&fromSearchBtn=1`);
    // return fetch url
    return fetch(url)
      // then res res.text()
      .then(res => res.text())
        // catch err
      .catch(err => {
        // print error
        console.log("Search Error: ".red, JSON.stringify(err, null, 4));
      });
};
*/


const fetch = require('node-fetch');
const colors = require('colors');

exports.search = (key, page = 0) => {
    const url = encodeURI(`https://www.liepin.com/zhaopin/?key=${key}&curPage=${page}&fromSearchBtn=1`);

    return fetch(url)
        .then(res => res.text())
        .catch(err => {
            console.log("Search Error: ".red, JSON.stringify(err, null, 4));
        });
};
