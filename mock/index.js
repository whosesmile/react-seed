var Koa = require('koa');
var path = require('path');
var colors = require('colors/safe');

var port = 3000;
var mills = 300;

// init koa
var app = module.exports = new Koa();

// favicon
app.use(async(ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    return ctx.body = null;
  } else {
    await next();
  }
});

// 模拟延迟
app.use(async(ctx, next) => {
  let match = ctx.path.match(/\/delay\/ajax\/(\d+)/);
  if (match && match[1]) {

    ctx.body = await new Promise((resolve, reject) => {
      setTimeout(() => {
        // 特例:300毫秒返回异常 便于模拟异常
        if (match[1] == '300')
          resolve({ code: 500, data: match[1] });
        resolve({ code: 200, data: match[1] });
      }, match[1]);
    });
  } else {
    await next();
  }
});

// 模拟生产环境，接口延迟一定时间再返回
app.use(async(ctx, next) => {
  var file = ctx.path.replace(/^\/(\w+)\/ajax(.*)/, './$1$2');
  delete require.cache[require.resolve(file)];

  ctx.body = await new Promise((resolve, reject) => {
    setTimeout(() => {
      let data = require(file);
      if (typeof data === 'function')
        resolve(data());
      else
        resolve(data);
    }, mills);
  });

  await next();
});

app.listen(port, function() {
  console.log(colors.cyan(`Mock server started on port: ${port}`));
});
