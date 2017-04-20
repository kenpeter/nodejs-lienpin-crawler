const fetch = require('node-fetch');
const colors = require('colors');

exports.search = (key, page = 0) => {
    const url = encodeURI(`https://www.liepin.com/zhaopin/?key=${key}&curPage=${page}&fromSearchBtn=2&headckid=4a32229b91202179`);
    return fetch(url)
        .then(res => res.text())
        .catch(err => {
            console.log("Search Error: ".red, JSON.stringify(err, null, 4));
        });
};

