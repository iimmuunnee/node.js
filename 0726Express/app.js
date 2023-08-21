// 1. express 사용 기능 가져오기
const express = require("express")

// 2. express 실행 정보를 app 변수에 저장
const app = express()

// 3. router 기능 사용 선언
const router = express.Router()

// body 영역 사용 등록 => Post 방식 때 사용됨
app.use(express.urlencoded({extended : true})) // body 영역 허용
app.use(express.json()) // 받은 데이터 json객체로 변환

// 4. 서버 등록, 라우터라는 기능이 서버에 추가됨
app.use(router)
// 클라이언트가 요청보낸 주소값에 따라서 서버를 사용하겠다

// 6. 요청을 보낸 주소값에 대해서 처리
// 라우팅 Routing => /~ 로 구분짓기
router.get("/",(req, res) => {
    console.log("서버접속 확인");
})

router.get("/plus",(req, res) => {
    console.log("plus서버접속 확인");
    const num1 = parseInt(req.query.input1)
    const num2 = parseInt(req.query.input2)
    const result = num1 + num2
    console.log(result);
    res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
    res.write(`${num1} + ${num2} = ${result}`)
})

// get 방식
/* router.get("/login", (req, res) => {
    console.log("login 서버 접속");
    console.log(req.query);
    const id = req.query.inputId
    const pw = req.query.inputPw
    
    res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
    if(id == "aischool" && pw == "123"){
        res.write(`<div>로그인 성공!</div>`)
    }
    else {
        res.write(`<div>로그인 실패!</div>`)
    }
}) */

// post 방식
router.post("/login", (req, res) => {
    console.log("login 서버 접속");
    console.log(req.body);
    const id = req.body.inputId
    const pw = req.body.inputPw
    res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
    if(id == "aischool" && pw == "123"){
        res.write(`<div>로그인 성공!</div>`)
    }
    else {
        res.write(`<div>로그인 실패!</div>`)
    }
    res.end()
})

const avgTemp = require("../0725/gradeTemp")

router.post("/grade", (req, res) => {
    console.log("grade 사이트 접속");
    console.log(req.body);
    const name = req.body.name
    const html = parseInt(req.body.html)
    const css = parseInt(req.body.css)
    const node = parseInt(req.body.node)
    const android = parseInt(req.body.android)
    res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
    res.write(`이름 : ${name}<br>`)
    res.write(`HTML : ${html}<br>`)
    res.write(`CSS : ${css}<br>`)
    res.write(`NODE.JS : ${node}<br>`)
    res.write(`ANDROID : ${android}`)
    console.log(res.write(avgTemp.avgTemp(req.body)))
})


// 5. 포트번호 등록
app.listen(3000)

