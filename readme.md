
### Nodejs 小爬虫 - 抓取"猎聘网"招聘列表

#### use

```shell
npm install

node app.js
```

#### config

```js
module.exports = {
    key: '前端',      // 关键词
    page: 100,        // 抓取的页数
};
```

#### output

```shell
关键词：前端, 3996 条数据
go: 5222.149ms
```

#### json

```json
{
    "id": 198334509,
    "url": "https://www.liepin.com/job/198334509.shtml",
    "title": "招聘web前端开发工程师",
    "condition": [
        "12-24万",
        "深圳",
        "本科或以上",
        "3年工作经验"
    ],
    "time": "18小时前",
    "company": {
        "name": "齐家互联网科技深圳",
        "field": [
            "互联网",
            "移动互联网",
            "电子商务"
        ],
        "temptation": [
            "发展空间大",
            "弹性工作",
            "领导好",
            "扁平管理",
            "五险一金",
            "节日礼物",
            "团队聚餐",
            "管理规范",
            "年底双薪",
            "绩效奖金",
            "带薪年假",
            "年度旅游"
        ]
    }
}
```

