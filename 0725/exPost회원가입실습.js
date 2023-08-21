const http = require("http")
const qs = require("querystring")
// require("querystring") : 클라이언트로부터 넘겨받은 데이터(body 안에있는)를
// 쿼리스트링 형식처럼 사용할 수 있게 도와주는 모듈
const exPostTemp = require("./exPostTemp")

http.createServer((req, res) => {
    console.log("5500연결");
    // post 방식 데이터 꺼내오기(꺼내기, 사용하기)
    // 1. req.on("data") : 서버로 데이터를 (body영역에)가지고 요청을 보냈을 때 실행하겠습니다. 
    let body = ""
    req.on("data", (data) => {
    // data : 클라이언트로 부터 넘겨받은 데이터
        // const translatedMessageData = data.toString('utf8');
        // console.log(translatedMessageData);
        body += data;
    })
    // 2. 받아온 데이터를 사용가능하게 변환
    req.on("end", () => {
        let queryData = qs.parse(body)
        // res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
        res.write(exPostTemp.postTemp((queryData)))
        res.end()
    })
}).listen(7000)