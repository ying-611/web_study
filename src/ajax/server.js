// 1.引入express
const express = require('express');

// 2.创建应用对象
const app = express();

// 3.创建路由规则
app.get('/server', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');

  // 设置响应体
  response.send('hello ajax');
})

app.all('/server-json', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  // 响应头
  response.setHeader('Access-Control-Allow-Header', '*');
  // 响应一个数据
  const data = {
    name: 'lyy'
  }
  // 对对象进行字符串转换
  let str = JSON.stringify(data);
  // 设置响应体
  response.send(str);
})
app.get('/ie', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');

  // 设置响应体
  response.send('hello ie 2');
})

// 延时响应
app.get('/delay', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  setTimeout(() => {
    // 设置响应体
    response.send('延时响应');
  }, 3000)

})

// JQuert服务
app.all('/jquery-server', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');

    // 设置响应体
    // response.send('hello jquery');
    const data={name:'lyy'};
    response.send(JSON.stringify(data));



})

// axios服务
app.all('/axios-server', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');

    // 设置响应体
    // response.send('hello jquery');
    const data={name:'lyy'};
    response.send(JSON.stringify(data));
})

// axios服务
app.all('/fetch-server', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');

    // 设置响应体
    // response.send('hello jquery');
    const data={name:'lyy'};
    response.send(JSON.stringify(data));
})

// 监听端口启动服务
app.listen(8000, () => {
  console.log("服务已启动，8000端口监听中。。。")
})