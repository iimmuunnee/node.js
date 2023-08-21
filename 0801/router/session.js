const express = require("express")
const router = express.Router()
// request

// http://localhost:3000/s/setSession
router.get("/setSession", (req, res) => {
    // 세션 생성하기
    req.session.nickName = "session2"
    req.session.age = 20
    res.send("세션 만들기")
})

// http://localhost:3000/s/getSession
router.get("/getSession", (req, res) => {
    // 세션에 있는 값 가져오기
    // 클라이언트에게 세션 id가 있어서 request로 한다. id가 일치해야 값을 주기때문
    let cookieData = res.cookie
    console.log(cookieData);
    
    let nick = req.session.nickName
    let age = req.session.age
    console.log(nick);
    console.log(age);
    res.send("세션 가져오기")
})

// http://localhost:3000/s/deleteSession
router.get("/deleteSession", (req, res) => {
    // 모두 지우기
    req.session.destroy()

    // 지정한 세션값 지우기
    delete req.session.nickName
    req.session.nickName = ""
    res.send("세션 지우기")
})

module.exports = router