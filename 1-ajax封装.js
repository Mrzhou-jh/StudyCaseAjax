//ajax请求函数
function ajax(options) {
  //存储默认值
  var defaults = {
    type: "get",
    url: "http://localhost:80/firat",
    data: {},
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: function(xhr, data) {},
    serror: function(xhr, data) {}
  };
  //对象覆盖
  Object.assign(defaults, options);
  //创建ajax对象
  var xhr = new XMLHttpRequest();
  //拼接请求参数的变量(函数调用的时候传递参数以对象的形式书写便于操作，但实际请求参数格式是"参数名=参数值&参数名=参数值"的样式或者是post请求方式支持的JSON数据格式的因此下面要对其进行处理)
  var params = "";
  for (const attr in defaults.data) {
    params += attr + "=" + defaults.data[attr] + "&";
  }
  //上面for循环完成后最后面会对一个&符号因此要截取掉，如下
  params = params.substr(0, params.length - 1);

  //设置请求地址及请求参数因为不同请求方式的参数传递方式不太一样因此需要发送请求前需要先判断一下
  if (defaults.type == "get") {
    //如果是get请求时直接将参数拼接到地址后面
    defaults.url += "?" + params;
    //如果是post请求我们必须设置请求头信息（设置请求参数格式类型）参数是在发送请求时的传入xhr.send()方法中
  }
  //设置请求地址及请求方式
  xhr.open(defaults.type, defaults.url);
  if (defaults.type == "post") {
    //如果是post请求我们必须设置请求头信息(设置请求参数格式类型)
    //注意post请求方式支持两种参数格式类型一种是如上的 "application / x - www - form - urlencoded"另一种是"application/json"
    var contenType = defaults.header["Content-Type"];
    xhr.setRequestHeader("Content-Type", contenType);
    if (contenType == "application/json") {
      //如果设置的是json格式则直接将传入的对象数据类型参数通过JSON转换成json对象即可
      xhr.send(JSON.stringify(defaults.data));
    } else {
      //设置的参数类型不为json格式时将上面处理的参数params传入即可
      xhr.send(params);
    }
  } else {
    xhr.send();
  }

  //监听响应事假接收到响应后触发
  xhr.onload = function() {
    //获取响应头中数据类型
    var contentType = xhr.getResponseHeader("Content-Type");

    //获取服务器的响应数据
    var responseText = xhr.responseText;
    //判断响应头中数据类型是否包含"application/json"
    if (contentType.includes("application/json")) {
      //如果是就将JSON格式解析
      responseText = JSON.parse(responseText);
    }
    //判断htpp状态码
    if (xhr.status == 200) {
      options.success(xhr, responseText);
    } else {
      option.serror(xhr, responseText);
    }
  };
}
// ajax({
//   type: "get", //请求类型get/post
//   url: "http://localhost:3000/firat", //请求地址(完整地址)
//   data: {
//     //请求参数
//     name: "张三",
//     age: 20
//   },
//   header: {
//     //请求数据格式
//     "Centen-Type": "application / x - www - form - urlencoded"
//   },
//   success: function(xhr, data) {
//     //请求成功后的回调函数
//     //执行参数
//   },
//   serror: function(xhr, data) {}
// });
