// express 사용 3단계
// 1. npm init => 프로젝트의 정보를 저장하는 package.json 생성
// 2. 프로젝트 express 설치
// 3. 프로젝트 구조 생성
// config (환경설정), public (정적페이지), router (경로), app.js (서버)
// http://localhost:3001

// express 서버 생성
// 1. express 모듈 가져오기
const express = require("express");

// 2. express 실행 정보를 app 변수에 담아주기
const app = express();

// 4. 경로를 설정할 수 잇는 Router 만들기
// router 모듈화 해서 가져오기
const router = require("./router/router")
const page = require("./router/page")


// 동적 페이지를 사용할 수 있는 nunjucks 가져오기
const nunjucks = require("nunjucks")
// view engine 확장자를 html로 사용하겠다.
// html 파일들을 동적파일로 사용할 수 있게 만들겠다.
app.set("view engine", "html")

// views 안에 있는 html을 동적파일로 사용할 수 있게끔 만들겠다.
// 동적파일 => 데이터에 따라 화면이 바뀌는 파일
nunjucks.configure("views", {
    express: app,
    watch: true
})

// const router = express.Router()

/* router.get("/", (req, res) => {
    console.log("3000 접속 확인");
})

router.get("/response", (req, res) => {
    console.log(req.query.text);
}) */

// 5. router로 만든 경로를 서버(app)에 등록 시켜주기
// 서버에 등록 시킨다 => 미들웨어
app.use(express.urlencoded({extended: true}))
app.use(express.json())
// body영역 허용뒤 -> router 등록
app.use(router)
app.use(page)

// 3. 포트번호 달아주기
app.listen(3001)