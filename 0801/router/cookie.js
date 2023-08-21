const express = require("express")
const router = express.Router()

// 쿠키 : 저장공간을 클라이언트로 이용해서 데이터를 관리하는 기술
// 쿠키 생성
// http://localhost:3000/c/setCookie
router.get("/setCookie", (req, res) => {
    let nick = "aischool"
    
    // cookie => key : value
    res.cookie("nickName", nick, {
        maxAge:10000, // maxAge : 만료 기간(1000 => 1초)
    })
    // path : 쿠키가 어디로 요청이 들어왔을 때만 생성할 것인지
    // secure : https(보안) 으로 설정 되어 있을 때만 쿠키를 만들겠다.
    // httpOnly : 웹 서버를 통해서만 (http 통신일 때만) 쿠키에 접근
    res.send("쿠키생성")
})

// http://localhost:3000/c/getCookie
router.get("/getCookie",(req, res) => {
    // 쿠키 가져오기 req.cookies 객체형태
    // 쿠키값을 가져올 때만 req 객체를 이용한다. 브라우저에 있으니까
    console.log(req.cookies.nickName);
    res.send("쿠키 가져오기")
})

// http://localhost:3000/c/deleteCookie
router.get("/deleteCookie", (req, res) => {
    res.clearCookie("nickName")
    res.send("쿠키삭제")
})

module.exports = router