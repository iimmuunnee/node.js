const { log } = require("console")
const http = require("http")
const m_url = require("url")

// http://192.168.0.165:8000

http.createServer((req, res) => {
  console.log("8000접속완료")
  let queryData = m_url.parse(req.url, true).query
    console.log(queryData);
    let num1 = parseInt(queryData.num1)

    res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
    res.write("<table>")
    res.write("<tr>")
    for(let i = 1 ; i <= num1 ; i++){
        res.write(`<td>${i}</td>`)
    };
    res.write("</tr>")
    res.write("</table>")
    res.write(`<style>
    table {
        border: 1px solid black;
    }
    td {
        border: 1px solid black;
    }
    </style>`)

    res.end()
}).listen(8000)