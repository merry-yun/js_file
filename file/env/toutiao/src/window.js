window = this;
// document = {
//     referrer: "https://www.toutiao.com",
//     "createElement": function (tagName) {
//         let tag = (tagName+"").toLowerCase();
//         if (tag == 'canvas') {
//             return {
//                 "toDataURL": function () {
//                     return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAEYklEQVR4Xu3UAQkAAAwCwdm/9HI83BLIOdw5AgQIRAQWySkmAQIEzmB5AgIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlACBB1YxAJfjJb2jAAAAAElFTkSuQmCC"
//                 }
//             }
//         } else {
//             return {};
//         }
//     },
//     createEvent: function(eventName){
//         console.log(eventName);
//         return {
//             initEvent: function(x, x1, x2){
//                 console.log('initEvent', x)
//             },
//             addEventListener: function(x, x1){
//                 console.log("addEvent", x ,x1)
//             }
//         }
//     }
// }
// location = {
//     href: 'https://www.toutiao.com',
//     protocol: 'https:'
// }
// navigator = {
//     userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36",
//     platform: "Win32"
// }
// ;

// 使用proxy进行代理
// 语法：const p = new Proxy(target, handler)
// target 需要代理的对象
// headler 对代理p进行操作的函数
function vmProxy(o){
    return new Proxy(o, {
        set(target, property, value){
            console.log("set", target, property, value)
            return Reflect.set(...arguments)
        },
        get(target, property, recevier){
            console.log('get', target, property, recevier)
            return target[property]
        }
    });
};

// 防止检测tostring
(() => {
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

   delete Function.prototype['toString'];

   set_native(Function.prototype, myToString);
   set_native(Function.prototype.toString, myFunction_toString_symbol);
   safeFunction = (func) => {
       set_native(func, myFunction_toString_symbol);
   };
}).call();


Object.defineProperties(window, {
   [Symbol.toStringTag]: {
       value: "window",
       configurable: true
   }
});
window = vmProxy(window);
document = vmProxy(class document{});
location = vmProxy(class location{});
navigator = vmProxy(class navigator{});
