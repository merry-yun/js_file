// 防止检测tostring
(() => {
    "use strict";
   const $toString = Function.toString;
   const myFunction_toString_symbol = Symbol('('.concat('', ')_', (Math.random() + '').toString(36)));
   const myToString = function () {
       return typeof this == 'function' && this[myFunction_toString_symbol] || $toString.call(this);
   };
   function set_native(func, key, value) {
       Object.defineProperty(func, key, {
           "enumerable": false,
           "configurable": true,
           "writable": true,
           "value": value
       })
   }

   delete Function.prototype['toString'];//删除原型链上的tostring
   set_native(Function.prototype, myToString);
   set_native(Function.prototype.toString, myFunction_toString_symbol);
   safefunction = (func) => {
       console.log(func)
       set_native(func, myFunction_toString_symbol);
   };
}).call();