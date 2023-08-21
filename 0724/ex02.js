const http = require("http")
const m_url = require("url")
// url 모듈 : 클라이언트가 보낸 url정보를 사용할 수 있게 도와주는 모듈(기능)

// http://192.168.20.13:4000
http.createServer((req, res) => {
    console.log("접속완료");
    // http://192.168.20.13:4000/?inputId=gldsfds&inputPw=1dksf32
    // ? get 방식으로 쿼리스트링 형태로 데이터를 요청보낸다.
    // 쿼리스트링 : ?를 기준으로 왼쪽에는 주소, 오른쪽 data(key=value) >> key는 input태그에 적은 name
    // 데이터가 여러개라면 & 기호를 기준으로 나뉘어진다.

    // url에 담긴 데이터 꺼내기
    console.log(req.url) // req.url 클라이언트가 요청한 url
    // true --> 쿼리스트링의 데이터 부분만 사용하겠습니다
    // .query -> 사용할 수 있게끔 객체로 만들어 주겠습니다
    let queryData = m_url.parse(req.url, true).query 
    console.log(queryData)
    console.log("입력한 ID : ", queryData.inputId)
    console.log("입력한 PW : ", queryData.inputPw)
    
    // 넘겨받은 값
    // ID : aischool, PW : 123
    // h1 태그로 로그인 성공!
    // 둘중 하나라도 값이 다르다면
    // h1 태그로 로그인 실패!
    if(queryData.inputId == "aischool" && queryData.inputPw == '123'){
        res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
        res.write("<html>")
        res.write("<body>")
        res.write("<h1>로그인 성공!</h1>")
        res.write("</body>")
        res.write("</html>")
    }
    else{
        res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
        res.write("<html>")
        res.write("<body>")
        res.write("<h1>로그인 실패</h1>")
        res.write("</body>")
        res.write("</html>")
    }

    res.end()
}).listen(4000)
// 포트 --> 중복 X