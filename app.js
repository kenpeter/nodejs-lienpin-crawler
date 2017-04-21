// fetch
const fetch = require('node-fetch');
// $
const cheerio = require('cheerio');
// color
const colors = require('colors');
// save json
const json = require('jsonsave');

// api request
const api = require('./api');

// config search key and page
const { key, page } = require('./config');


/*
// 合并数组
const cat = (...arg) => {
  // arg is double array

  console.log(arg.reduce((sum, val) => [...sum, ...val], []));

  return arg.reduce(
    (sum, val) => {
      // sum is a single array
      // val is the same, a single array
      //console.log('-- test --');
      //console.log(...sum);
      //console.log(...val);
      return [...sum, ...val], [];
    }
  );

  // return arg.reduce((sum, val) => [...sum, ...val], []);
};
*/

const cat = (...arg) => arg.reduce((sum, val) => [...sum, ...val], []);

// const go, async
// page
const go = async (page) => {
    // 获取 html
    // wait for html
    const html = await api.search(key, page);
    // jquery
    const $ = cheerio.load(html + '');

    // need li
    // 筛选数据
    const list = $('.container .sojob-result  ul.sojob-list > li');

    // build array, here we have another array
    // 整理信息
    // list map, index, item
    return Array.from(list.map((index, item) => {
      // $(item), item is li
      const self = $(item);
      // url
      const url = self.find('.job-info > h3[title] > a').attr('href');
      //
      // url.match(/\d+/g) is Array
      // slice, then get 1 out
      const id = url.match(/\d+/g).slice(0, 1) * 1;

      // get <h3 title=''></h3>
      const title = self.find('.job-info > h3[title]').attr('title');

      // condi....
      const condition = self.find('.job-info > .condition[title]').attr('title').split('_');

      // time
      const time = self.find('.job-info > .time-info > time').text();

      // company
      const company = {
          name: self.find('.company-info > .company-name a').text(),
          field: self.find('.company-info > .field-financing a').text().split('/'),
          temptation: self.find('.company-info > .temptation > span').toArray().map(i => $(i).text()),
      };

      // return all
      return {
          id, url, title, condition, time, company
      };
    }));
};

console.time(go.name);
// promise all, array, why.....?
// because promise all needs array
Promise.all([ // here one array........
  // 构造数组 => go(0), go(1) ...
  // spread array
  // e.g. page = 100, so we have 100 empty item
  // index also matching page num
  ...(new Array(page).fill('').map((i, index) => go(index))) // it just promise {pending}, promise {pending}, etc...
])
.then(res => {
  // res is double array [['a', [b]]]
  // console.log(res);
  return cat(...res)
})
.then(res => {
  console.log(res);

  // save
  json.new().$$merge(Array.from(res)).$$saveAs(`${__dirname}/json/${key}_${res.length}_${Date.now()}.json`);

    console.log(`关键词：${key}, ${res.length} 条数据`);
    console.timeEnd(go.name);
  });
