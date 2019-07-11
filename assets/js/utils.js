
var utils = {};
utils.feiKong = function (elels) {
    let ele = document.querySelector(elels);
    let val = ele.value.trim();
    return val.length === 0;
}



utils.idFenGeQi = function () {
    let arr = location.search.substring(1).split('&');
    let obj = {}
    arr.forEach((e) => {
        let temp = e.split('=')
        obj[temp[0]] = temp[1]
    });
    return obj;
}