/**
 * @Description: mock 环境配置
 */
const fs = require('fs');
const path = require('path');
const jsonc = require('jsonc');
/**
 * 读取mock目录下的data数据
 * @param {*} filename
 */
function fromJSONFile(filename) {
    if (filename == 'test/mock') {
        return (req, res) => {
            const id = req.query.id;
            const bodyId = req.body.id;
            if (id == 1) {
                const data = fs.readFileSync(path.resolve(__dirname, `./data/${filename}-get-1.json`)).toString();
                const json = jsonc.parse(data);
                return res.json(json);
            } else if (bodyId == 1) {
                const data = fs.readFileSync(path.resolve(__dirname, `./data/${filename}-post-1.json`)).toString();
                const json = jsonc.parse(data);
                return res.json(json);
            } else {
                const data = fs.readFileSync(path.resolve(__dirname, `./data/${filename}.json`)).toString();
                const json = jsonc.parse(data);
                return res.json(json);
            }
        };
    } else {
        return (req, res) => {
            const data = fs.readFileSync(path.resolve(__dirname, `./data/${filename}.json`)).toString();
            const json = jsonc.parse(data);
            return res.json(json);
        };
    }
}
const proxy = {
    'GET /api/v1/topics': fromJSONFile('test/test'), //test
    'GET /api/mock/data': fromJSONFile('test/mock'), //mock
    'POST /api/mock/data': fromJSONFile('test/mock'), //mock
    'GET /fdapp/api/rehabilitation-home/v1/hospital/level/01': fromJSONFile('test/level01')
};
module.exports = proxy;
