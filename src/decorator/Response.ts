import {ResHttpResponseType, ResMethodKey} from "../types/module";
import 'reflect-metadata';

export function HttpRes() {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        Reflect.defineMetadata(ResMethodKey, parameterIndex, target, propertyKey);
    }
}

export function HttpResponseType(type?: string) {
    return function (target: any, propertyKey: string | symbol) {
        Reflect.defineMetadata(ResHttpResponseType, type, target, propertyKey);
    }
}

