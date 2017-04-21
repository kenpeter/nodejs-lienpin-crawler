const fetch = require('node-fetch');
const cheerio = require('cheerio');
const colors = require('colors');
const json = require('jsonsave');

const api = require('./api');
const { key, page } = require('./config');

// 合并数组
const cat = (...arg) => arg.reduce((sum, val) => [...sum, ...val], []);

const go = async (page) => {

    // 获取 html
    const html = await api.search(key, page);
    const $ = cheerio.load(html + '');

    // 筛选数据
    const list = $('.container .sojob-result  ul.sojob-list > li');

    // 整理信息
    return Array.from(list.map((index, item) => {
        const self = $(item);

        const url = self.find('.job-info > h3[title] > a').attr('href');

        const id = url.match(/\d+/g).slice(0, 1) * 1;

        const title = self.find('.job-info > h3[title]').attr('title');

        const condition = self.find('.job-info > .condition[title]').attr('title').split('_');

        const time = self.find('.job-info > .time-info > time').text();

        const company = {
            name: self.find('.company-info > .company-name a').text(),
            field: self.find('.company-info > .field-financing a').text().split('/'),
            temptation: self.find('.company-info > .temptation > span').toArray().map(i => $(i).text()),
        };

        return {
            id, url, title, condition, time, company
        };
    }));
};

console.time(go.name);
// 并发请求
Promise.all([
    // 构造数组 => go(0), go(1) ...
    ...(new Array(page).fill('').map((i, index) => go(index)))
])
    .then(res => cat(...res))
    .then(res => {
        // save
        json.new().$$merge(Array.from(res)).$$saveAs(`${__dirname}/json/${key}_${res.length}_${Date.now()}.json`);

        console.log(`关键词：${key}, ${res.length} 条数据`);
        console.timeEnd(go.name);
    });
