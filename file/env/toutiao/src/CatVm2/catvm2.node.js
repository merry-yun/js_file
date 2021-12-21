let fs = require('fs');

//框架工具模块
let vmtools = require('./tools/tools.node.js');

function GetCode(){
    let code = "";
    // 引入框架工具代码
    code += vmtools.GetCode() + '\r\n';

    // 引入浏览器相关
    code += fs.readFileSync(`${__dirname}/browser/window.js`)
    code += fs.readFileSync(`${__dirname}/browser/location.js`)
    code += fs.readFileSync(`${__dirname}/browser/document.js`)
    code += fs.readFileSync(`${__dirname}/browser/navigator.js`)

    // 引入用户自定义环境

    code += "debugger;\r\n";
    return code
}

module.exports = {
    GetCode
}