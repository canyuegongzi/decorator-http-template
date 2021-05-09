import {ResHttpResponseType, ResMethodKey} from "../types";
import 'reflect-metadata';

/**
 * 参数注解 注解http response
 * @constructor
 */
export function HttpRes() {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        Reflect.defineMetadata(ResMethodKey, parameterIndex, target, propertyKey);
    }
}

/**
 * 注解http 数据返回类型
 * @param type<ResponseType> 默认json
 * @constructor
 */
export function HttpResponseType(type?: ResponseType) {
    return function (target: any, propertyKey: string | symbol) {
        Reflect.defineMetadata(ResHttpResponseType, type, target, propertyKey);
    }
}

