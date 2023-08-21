const http = require("http")
const m_url = require("url")

// http://192.168.0.165:5000

http.createServer((req, res) => {
    console.log("5000접속완료");

    let queryData = m_url.parse(req.url, true).query
    console.log(queryData);
    let input1 = parseInt(queryData.input1)
    let input2 = parseInt(queryData.input2)
    let math = queryData.math
    res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})

    if(math == "+"){
        res.write(`<h1>${input1} + ${input2} = ${input1 + input2}</h1>`)
    }
    else if(math == "-"){
        res.write(`<h1>${input1} - ${input2} = ${input1 - input2}</h1>`)
    }
    else if(math == "/"){
        res.write(`<h1>${input1} / ${input2} = ${input1 / input2}</h1>`)
    }
    else if(math == "*"){
        res.write(`<h1>${input1} * ${input2} = ${input1 * input2}</h1>`)
    }
    else{
        res.write("<h1>넌 나가라</h1>")
    }


    res.end()
}).listen(5000)