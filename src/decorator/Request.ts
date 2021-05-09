import {
    ReqHttpBaseUrl,
    ReqHttpTransformRequest,
    ReqMethodData, ReqMethodKeyData, ReqMethodKeyParams, ReqMethodKeyQuery,
    ReqMethodParams,
    ReqMethodQuery
} from "../types";
import 'reflect-metadata';

/**
 * 请求参数注解   @HttpQuery()  | @HttpQuery('id')
 * @param key 参数key,当存在此参数时，请求参数中只会包含此key的值， 大部分情况下适用于 user/:id  类接口， 默认发送全部参数
 * @constructor
 */
export function HttpQuery(key?: string) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        Reflect.defineMetadata(ReqMethodQuery, parameterIndex, target, propertyKey);
        if (key) {
            Reflect.defineMetadata(ReqMethodKeyQuery, key, target, propertyKey);
        }
    }
}

/**
 * 请求参数注解   @HttpParams()  | @HttpParams('id')
 * @param key 参数key,当存在此参数时，请求参数中只会包含此key的值， 大部分情况下适用于 user/:id  类接口， 默认发送全部参数
 * @constructor
 */
export function HttpParams(key?: string) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        Reflect.defineMetadata(ReqMethodParams, parameterIndex, target, propertyKey);
        if (key) {
            Reflect.defineMetadata(ReqMethodKeyParams, key, target, propertyKey);
        }
    }
}
/**
 * 请求参数注解   @HttpPostData()  | @HttpPostData('id')
 * @param key 参数key,当存在此参数时，请求参数中只会包含此key的值， 大部分情况下适用于 user/:id  类接口， 默认发送全部参数
 * @constructor
 */
export function HttpPostData(key?: string) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        Reflect.defineMetadata(ReqMethodData, parameterIndex, target, propertyKey);
        if (key) {
            Reflect.defineMetadata(ReqMethodKeyData, key, target, propertyKey);
        }
    }
}

/**
 * 请求参数转换注解
 * @param transformRequestM<(data: any) => any> 适配器函数，函数必须返回新的数据
 * @constructor
 */
export function HttpTransformRequest(transformRequest: (data: any) => any) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(ReqHttpTransformRequest, transformRequest, target, propertyKey);
    }
}

/**
 * 接口前缀地址
 * @param baseUrl<string> 接口地址
 * @constructor
 */
export function HttpBaseUrl(baseUrl: string) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(ReqHttpBaseUrl, baseUrl, target, propertyKey);
    }
}
