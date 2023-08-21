
console.log("실행 확인");

// 파일을 서버로 만들기 위해서는 서버의 기능을 할 수 있는 
// 모듈을 가져와서 사용해야 한다.
// http 기능(모듈)을 불러와서 사용하기
const http = require("http")

// http://192.168.20.13(ip주소)
// cmd 창에서 ipconfig
// http://192.168.20.13:3000
http.createServer(function(request, response) {
    // 1. createSErver : 현재 js 파일을 서버로 만들어 주는 역할!
    // 2. function(request, response) {실행로직} : 클라이언트가 요청을 보냈을 때 실행할 로직
    console.log("접속 확인")

    // request : 클라이언트가 서버로 요청을 보냈을 때 정보를 가지고 있다
    let ip = request.connection.remoteAddress;
    console.log("요청보낸 주소 : ", ip)

    // 응답값 만들어 주기 => html 형식!
    // 200 => 통신 성공 코드
    // "Content-Type" : "text/html" => html 형식으로 응답하겠습니다
    // response : 응답 객체 => 응답을 하기위한 객체
    response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
    response.write("<html>")
    response.write("<body>")
    response.write("<h1>첫번째 응답</h1>")
    response.write("</body>")
    response.write("</html>")

    response.end()
}).listen(3000) // 포트번호 설정

// CLI : command line interface --> 리눅스 기반
// GUI : 사용자의 초점에 맞춘 화면 --> window 명령

// cd : 경로 이동 ex) cd 경로명(폴더)
// ls : 현재 경로에서 접근할 수 있는 파일 확인
// clear : 커맨드 창 지우기
// tab : 자동완성