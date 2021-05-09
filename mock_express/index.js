// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// 创建 application/x-www-form-urlencoded 编码解析(post方法)
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})


//登录
app.post('/login', bodyParser.json(), function (req, res) {
    console.log('参数');
    console.log(req.body);
    console.log(req.body.username);
    const username = req.body.username;
    const password = req.body.password;
    res.status(200)
    res.json({message: "success", data: {username, password}})
})

