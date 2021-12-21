let fs = require('fs');
const {VM, VMScript} = require('vm2');
const File = `${__dirname}/code.js`;
console.log(`${__dirname}`)
const windowFile = `${__dirname}/window.js`;
const vm = new VM();
const script = new VMScript(fs.readFileSync(windowFile) + fs.readFileSync(File), "VM2 代码调试");
vm.run(script);
debugger
