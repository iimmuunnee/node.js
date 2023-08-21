const express = require("express");
const app = express();

// const router = require("./router/router")
const page = require("./router/page")
const user = require("./router/user")

const nunjucks = require("nunjucks")

app.set("view engine", "html")

nunjucks.configure("views", {
    express: app,
    watch: true
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// app.use(router)
// 미들웨어 경로 설정
app.use("/page", page)
app.use("/user", user)

app.listen(3001)