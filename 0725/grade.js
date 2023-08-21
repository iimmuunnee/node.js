const http = require("http")
const qs = require("querystring")
const gradeTemp = require("./gradeTemp.js")

http.createServer((req, res) => {
    console.log("6000연결");
    let body = ""

    req.on("data", (data) => {
        body += data
    })
    console.log(body);

    req.on("end", () => {
        let queryData = qs.parse(body)
        let html = parseInt(queryData.html)
        let css = parseInt(queryData.css)
        let node = parseInt(queryData.node)
        let android = parseInt(queryData.android)
        res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
       
        let avg = (html + css + node + android) / 4
        res.write(gradeTemp.gradeTemp(queryData))
        res.write(`<div>avg : ${avg}</div>`)
        if(avg >= 95){
            res.write(`<div>grade : A+</div>`)
        }
        else if (avg >= 90){
            res.write(`<div>grade : A</div>`)
        }
        else if (avg >= 85){
            res.write(`<div>grade : B+</div>`)
        }
        else if (avg >= 80){
            res.write(`<div>grade : B</div>`)
        }
        else if (avg >= 75){
            res.write(`<div>grade : C</div>`)
        }
        else{
            res.write(`<div>grade : F</div>`)
        }
        res.end()
    })

}).listen(6001)