function errorHandle (res) {
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Method': 'PATCH, POST, GET, OPTIONS, DELETE',
        'Content-Type': 'application/json'
    }
    res.writeHead(400, headers);
    res.write(
      JSON.stringify({
        status: "false",
        message: "欄位未填寫正確，或無此todo ID",
      })
    );
    res.end();
}

// 模組匯出
module.exports = errorHandle;
  