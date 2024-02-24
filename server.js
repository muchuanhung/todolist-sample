const http = require("http");
const { v4: uuidv4 } = require("uuid");
const errorHandle = require("./errorHandle");
const todos = [];
const requestListener = (req, res) => {
  //回傳的標頭定義
  const headers = {
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Method": "PATCH, POST, GET, OPTIONS, DELETE",
    "Content-Type": "application/json",
  };
  let body = "";

  // 接收 post API的body資料
  req.on("data", (chunk) => {
    console.log("chunk");
    body += chunk;
  });

  //處理不同的請求方式
  if (req.url == "/todos" && req.method == "GET") {
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        data: todos,
      })
    );
    res.end();
  } else if (req.url == "/todos" && req.method == "POST") {
    req.on("end", () => {
      try {
        const title = JSON.parse(body).title;
        if (title !== "undefined") {
          const todo = {
            title: title,
            id: uuidv4(),
          };
          todos.push(todo);
          res.writeHead(200, headers);
          res.write(
            JSON.stringify({
              status: "success",
              data: todos,
            })
          );
          res.end();
        } else {
          errorHandle(res);
        }
      } catch (error) {
        errorHandle(res);
      }
    });
  } else if (req.url == "/todos" && req.method == "DELETE") {
    //快速陣列清空
    todos.length = 0;
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        data: todos,
      })
    );
    res.end();
  } else if (req.url.startsWith("/todos") && req.method == "DELETE") {
    // 拆分撈出uuid
    const id = req.url.split("/").pop();
    const index = todos.findIndex((element) => element.id == id);
    if (index !== -1) {
        todos.splice(index,1);
        res.writeHead(200, headers);
        res.write(
            JSON.stringify({
            status: "success",
            data: todos,
        })
      );
      res.end();
    } else {
      errorHandle(res);
    }
  } else if (req.url.startsWith("/todos") && req.method == "PATCH") {
    req.on("end", () => {
      try {
        const todo = JSON.parse(body).title;
        const id = req.url.split("/").pop();
        const index = todos.findIndex((element) => element.id == id);
        if (todo !== undefined && index !== -1) {
          todos[index].title = todo;
          res.writeHead(200, headers);
          res.write(
            JSON.stringify({
              status: "success",
              data: todos,
            })
          );
          res.end();
        } else {
          errorHandle(res);
        }
      } catch {
        errorHandle(res);
      }
    });
  }
  // 跨網域設定
  else if (req.url == "/todos" && req.method == "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
  }
  // 404無對應路由
  else {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: "false",
        message: "無此路由",
      })
    );
    res.end();
  }
};
const server = http.createServer(requestListener);
server.listen(8080);
