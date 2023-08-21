exports.gradeTemp = (queryData) => {
    let grade_html = ""
        grade_html = 
        `<div>name : ${queryData.name}`+
        `<div>html : ${queryData.html}`+
        `<div>css : ${queryData.css}`+
        `<div>nodejs : ${queryData.node}`+
        `<div>android : ${queryData.android}`
        return grade_html
}
