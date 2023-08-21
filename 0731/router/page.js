// views 안에있는 html 파일끼리 페이지 이동이 되게끔 설정해주는 역할
const express = require("express")
const router = express.Router()

// http://localhost:3001/page
router.get("/", (req, res) => {
    res.render("main")
})

// http://localhost:3001/page/login
router.get("/login", (req, res) => {
    res.render("Login")
})

router.get("/join", (req, res) => {
    res.render("Join")
})

router.get("/delete", (req, res) => {
    res.render("delete")
})

router.get("/update", (req, res) => {
    res.render("update")
})

router.get("/search", (req, res) => {
    res.render("search")
})



module.exports = router