export function isEmptyFunction(func){
    if(typeof func != 'function'){
        return false
    }
    let str = func.toString().replace(/\s+/g,'')
    str = str.match(/{.*}/g)[0]
    return str === '{}'
}
