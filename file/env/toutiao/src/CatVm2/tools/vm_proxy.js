
//框架代理模块
catvm.proxy = function(o){
    if(catvm.memory.config.proxy == false) {return o};
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
}