// 화면에 대한 구조 정의 => 모듈화
exports.postTemp = (queryData) => {
    let result_html = ""
        result_html =
        `<div>${queryData.name}</div>` +
        `<div>${queryData.pw}</div>` +
        `<div>${queryData.gender}</div>` +
        `<div>${queryData.blood}</div>`

    return result_html;
}