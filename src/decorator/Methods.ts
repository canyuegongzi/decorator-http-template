import {createHttpDecoratorFunction} from "./common/createHttpDecoratorFunction";

/**
 * post post请求
 * @param url<string> 接口地址   /user/login
 * @param data<Object> 请求参数 一般参数都是动态参数，不会采用这中方式
 * @param options<string[] | string> 请求头部参数 建议直接使用HttpHeader 注解
 * @constructor
 */
export function HttpPost(url: string, data?: any, options: string[] = []) {
    return createHttpDecoratorFunction('POST', url, data, options)
}

/**
 * post get请求  /user/list | /user/usrInfo/:id
 * @param url<string> 接口地址
 * @param data<Object> 请求参数 一般参数都是动态参数，不会采用这中方式
 * @param options<string[] | string> 请求头部参数 建议直接使用HttpHeader 注解
 * @constructor
 */
export function HttpGet(url: string, data?: any, options: string[] = []) {
    return createHttpDecoratorFunction('GET', url, data, options)
}

/**
 * delete请求  /user/delete | /user/delete/:id
 * @param url<string> 接口地址
 * @param data<Object> 请求参数 一般参数都是动态参数，不会采用这中方式
 * @param options<string[] | string> 请求头部参数 建议直接使用HttpHeader 注解
 * @constructor
 */
export function HttpDelete(url: string, data?: any, options: string[] = []) {
    return createHttpDecoratorFunction('DELETE', url, data, options)
}

/**
 * options请求
 * @param url<string> 接口地址
 * @param data<Object> 请求参数 一般参数都是动态参数，不会采用这中方式
 * @param options<string[] | string> 请求头部参数 建议直接使用HttpHeader 注解
 * @constructor
 */
export function HttpOptions(url: string, data?: any, options: string[] = []) {
    return createHttpDecoratorFunction('OPTIONS', url, data, options)
}

/**
 * patch请求
 * @param url<string> 接口地址
 * @param data<Object> 请求参数 一般参数都是动态参数，不会采用这中方式
 * @param options<string[] | string> 请求头部参数 建议直接使用HttpHeader 注解
 * @constructor
 */
export function HttpPatch(url: string, data?: any, options: string[] = []) {
    return createHttpDecoratorFunction('PATCH', url, data, options)
}


