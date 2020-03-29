/* ========= node.js静态服务程序(依赖nodejs环境及nodejs系统模块搭建)=========== */
const http = require("http"); //导入nodejs的系统http模块用于创建服务
const url = require("url"); //导入nodejs的系统url模块用于解析请求地址
const formidable = require("formidable"); //解析formdata对象参数及二进制参数模块
const path = require("path");
const app = http.createServer();
let isok = "cg";
app.on("request", (req, res) => {
  //客户端使用的是ajax请求，因此需要解决浏览器的同源策略跨域问题
  res.writeHead(200, {
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, Content-Type"
  });
  var urlparse = url.parse(req.url, true);
  //console.log(urlparse, req.method);

  //判断客户端的请求方式(该服务只用于客户端测试ajax)
  if (req.method == "GET") {
    switch (urlparse.pathname) {
      case "/verification/input": //验证邮箱是否存在路由
        //随机模拟存在或不存在结果
        isok == "cg" ? (isok = "sb") : (isok = "cg");
        res.end(isok);
        break;
      case "/select1": //省份信息
        const { id } = urlparse.query;
        if (id) {
          if (id == 1) {
            console.log(id);
            res.end(
              JSON.stringify([
                { id: 1, name: "长沙" },
                { id: 2, name: "岳阳" },
                { id: 3, name: "常德" }
              ])
            );
          }
          if (id == 2) {
            console.log(id);
            res.end(
              JSON.stringify([
                { id: 1, name: "武汉" },
                { id: 2, name: "武昌" },
                { id: 3, name: "武" }
              ])
            );
          }
          if (id == 3) {
            console.log(id);
            res.end(
              JSON.stringify([
                { id: 1, name: "广州" },
                { id: 2, name: "深圳" },
                { id: 3, name: "东莞" }
              ])
            );
          }
        } else {
          res.end(
            JSON.stringify([
              { id: 1, name: "湖南" },
              { id: 2, name: "湖北" },
              { id: 3, name: "广东" }
            ])
          );
        }

        break;
      default:
        break;
    }
  } else if (req.method == "POST") {
    switch (urlparse.pathname) {
      case "/serach": //表单输入提示路由
        var datacontent = "";
        req.on("data", params => {
          datacontent += params;
        });
        req.on("end", () => {
          console.log(datacontent.split("="));
          if (datacontent == "content=1") {
            //模拟输入1的时候出现如下提示
            res.end(JSON.stringify([123456, 23456, 3456, 456, 56]));
          } else {
            res.end(JSON.stringify([]));
          }
        });
        break;
      case "/formdata":
        const form = new formidable.IncomingForm(); //创建解析formdata对象(formidable Node.js第三方框架)
        form.uploadDir = path.join(__dirname, "public", "uploads"); //设置上传的二进制文件保存路径
        form.keepExtensions = true; //设置上传文件保存时是否保留后缀名（默认不保存）
        form.parse(req, (err, fields, files) => {
          console.log(fields); //解析的普通表单文件或者（formdata对象文件）
          console.log(files); //二进制上传文件的解析后信息
          res.end(
            "服务器接收到你的请求，发送请求的参数为" + JSON.stringify(fields)
          );
        });
      default:
        break;
    }
  }
});
app.listen(8080, () => {
  console.log("服务启动成功请访问");
});
