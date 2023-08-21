const express = require("express")
const app = express()
const routerCookie = require("./router/cookie")
const routerSession = require("./router/session")
// 쿠키에 있는 데이터를 꺼내올 때
// 사용할 수 있게 변환해줌
const cookieParser = require("cookie-parser")

// 세션 : 공통 저장 공간을 서버에 만들어서 사용하는 기능
const session = require("express-session")
app.use(session({
    httpOnly : true, // http 통신일 때 허용
    secret : "secretKey", // 암호화 키
    resave : false, // 요청이 들어왔을 때 세션에 수정사항이 없더라도 다시 저장
    saveUninitialized : false,
}))
app.use("/s", routerSession)

app.use(cookieParser())
app.use("/c", routerCookie)

app.listen(3000)