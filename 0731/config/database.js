// config 파일은 개발에 관련된 환경 설정에 대한 정보를 관리한다.
const mysql = require("mysql2")

let conn = {
    // mysql 서버의 주소(ip값을 가져오기)
    host : "127.0.0.1",
    // mysql에 접속할 id, pw
    user : "root",
    password : "123456",
    // 포트번호
    port : "3306",
    database : "nodejs_DB2"
}

module.exports = {
    init : () => {
        return mysql.createConnection(conn)
    }
}