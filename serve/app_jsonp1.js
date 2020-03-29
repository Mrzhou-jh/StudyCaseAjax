/* 演示jsonp解决跨域文问题示例 */
const http = require("http");
const url = require("url");
const app = http.createServer();
app.on("request", (req, res) => {
  /* ==================第一种写法================*/
  // var parseurl = url.parse(req.url, true);
  // console.log(parseurl);
  // parseurl.pathname == "/getinfo"
  //   ? res.end("fn({name:'张三',age:20})")
  //   : res.end("hahahah");

  /* ==================优化写法=================*/
  //因为我服务端响应的函数名称必须与客户端定义的名称一致(不便于改动)
  //所以让客户端通过请求参数的方式吧函数名称传递过来（这样服务端就不用写死函数名称了）
  //所以有一个约定俗称的参数名称叫callback其值就是函数名
  var parseurl = url.parse(req.url, true);
  parseurl.pathname == "/getinfo"
    ? res.end(parseurl.query.callback + "({name:'张三',age:20})")
    : res.end("hahahah");
});

app.listen(8081, () => {
  console.log("服务启动成功");
});
