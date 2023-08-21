const express = require("express")
const path = require("path")
const router = express.Router()

// DB 연결하기
// 1. MYSQL 연결할 수 있는 MYSQL이라는 모듈 가져오기
const mysql = require("mysql2")
// 2. mysql DB에 접근 할 수 있는 정보를저장
// DB에 접근할 수 있는 기능을 새로운 변수에 저장하기
let conn = mysql.createConnection({
    // mysql 서버의 주소(ip값을 가져오기)
    host : "127.0.0.1",
    // mysql에 접속할 id, pw
    user : "root",
    password : "123456",
    // 포트번호
    port : "3306",
    database : "nodejs_DB2"
})

router.get("/getAlluser", (req, res) => {
    conn.connect()
    let sql = "SELECT * FROM MEMBER"
    conn.query(sql, (err, rows) => {
        if(!err){
            console.log(rows);
            let test = "test"
            res.render("getAlluser", {rows})
        }
        else{
            console.log("오류");
        }
    })

})


router.get("/", (req, res) => {
    console.log("3000 접속 확인");
    res.render("Temp", {day:"월요일"})
})

router.get("/response", (req, res) => {
    console.log(req.query.text);
    res.end()
})

router.get("/nextPage", (req, res) => {
    const nextpage = req.query.site
    console.log(req.query.site);
    // 페이지 이동하는 방법 redirect("주소")
    if(nextpage == "google"){
        res.redirect("https://www.google.co.kr/?hl=ko")
    }
    else if(nextpage == "naver"){
        res.redirect("https://www.naver.com/")
    }
    else if(nextpage == "daum"){
        res.redirect("https://www.daum.net/")
    }
})

router.get("/login", (req, res) => {
    const id = req.query.id
    const pw = req.query.pw

    if(id == "123" && pw == "123"){
        res.sendFile(path.join(__dirname, ".." ,"public", "S.html"))
    }
    else{
        res.sendFile(path.join(__dirname, "..", "public", "F.html"))
    }

})



router.get("/join", (req, res) => {
     let joinId = req.query.id
     let joinPw = req.query.pw
     let joinNick = req.query.nickname
    // DB 접속
    conn.connect()
    let sql = `insert into member values(
        "${joinId}", "${joinPw}", "${joinNick}"
    )`

    // ? => 나중에 값을 담아주겠습니다.
    let sql2 = `insert into member values(
        ?, ?, ?
    )`
    // coon.query(sql, function) => sql 쿼리문을 실행 시키겠다.
    conn.query(sql2, [joinId, joinPw, joinNick] ,(err, rows) => {
        // err => 쿼리문에 오류 내용을 받아옴
        // rows 실행된 결과를 받아옴
        // err 또는 rows 둘 중 하나만 값이 들어간다
        if(!err){ // err가 아니라면 -> 정상이라면
            console.log("실행 성공");
        }
        else{ // err가 났다면
            console.log("실행 실패");
        }
    })



    res.sendFile(path.join(__dirname, "..", "public", "login.html"))
})

// 로그인
router.post("/login", (req, res) => {
    const id = req.body.id
    const pw = req.body.pw

    conn.connect()

    conn.query("select * from member", (err, result) => {
        if(!err){
            // some 함수는 배열의 각 요소에 대해 조건을 검사한다. 
            // 조건을 만족하는 요소가 하나라도 있으면 true를 반환하고 아니라면 false를 반환한다.
            let authenticated = result.some((user) => user.ID === id && user.PW === pw)
            let condition = (element) => element.ID === id && element.PW === pw

            const foundIndex = result.findIndex((element, index) => {
                if(condition(element)){
                    return true
                }
            });

            if(authenticated){
                let user = result[foundIndex].NICK;
                console.log(result[foundIndex].NICK);
                // views의 LoginS의 파일로 렌더하고 user데이터를 담은 nick변수도 함께 보낸다.
                res.render("LoginS", {nick: user})
                // res.sendFile(path.join(__dirname, ".." ,"public", "S.html"))

            }
            else{
                res.sendFile(path.join(__dirname, "..", "public", "F.html"))
            }
        }
        else{
            console.log("에러");
        }
    })


})

// 회원 삭제
router.get("/delete", (req, res) => {
    let nickname = req.query.deleteUser

    conn.connect()
    let sql = `SELECT * FROM MEMBER`
    conn.query(sql, (err, rows) => {
        if(!err){
            let authenticated = rows.some((user) => user.NICK === nickname)
            if(authenticated){
                console.log("삭제 성공");
                conn.query(`delete from member where NICK = '${nickname}'`)
                res.redirect("http://localhost:3000/0727Express/public/main.html")
            }
            else{
                console.log("삭제 실패");
            }
        }
        // else{
        //     console.log("삭제 실패");
        // }
    })
})

router.post("/update", (req, res) => {
    let id = req.body.id
    let changedPw = req.body.changedPw
    let changedNick = req.body.changedNick

    conn.connect()
    let sql = `SELECT * FROM MEMBER`
    let updateSql = `UPDATE MEMBER SET PW = "${changedPw}", NICK = "${changedNick}" WHERE ID = "${id}"`
    conn.query(sql, (err, rows) => {
        if(!err){
            let authenticated = rows.some((user) => user.ID == id)
            if(authenticated){
                conn.query(updateSql)
                console.log("수정 성공");
                res.redirect("http://127.0.0.1:5500/0727Express/public/main.html")
                // res.sendFile(path.join(__dirname , "..", "public", "main.html"))
            }
            else{
                console.log("수정 실패");
            }
        }
        else{
        }
    })
})





// 위에 만들어진 기능을 외부에서 사용 할 수 있도록 빼내는 작업
// --> 모듈화 (router를 모듈화)
module.exports = router