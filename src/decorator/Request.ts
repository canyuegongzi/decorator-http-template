import {
    ReqHttpBaseUrl,
    ReqHttpTransformRequest,
    ReqMethodData, ReqMethodKeyData, ReqMethodKeyParams, ReqMethodKeyQuery,
    ReqMethodParams,
    ReqMethodQuery
} from "../types/module";
import 'reflect-metadata';


export function HttpQuery(key?: string) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        Reflect.defineMetadata(ReqMethodQuery, parameterIndex, target, propertyKey);
        if (key) {
            Reflect.defineMetadata(ReqMethodKeyQuery, key, target, propertyKey);
        }
    }
}

export function HttpParams(key?: string) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        Reflect.defineMetadata(ReqMethodParams, parameterIndex, target, propertyKey);
        if (key) {
            Reflect.defineMetadata(ReqMethodKeyParams, key, target, propertyKey);
        }
    }
}

export function HttpPostData(key?: string) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        Reflect.defineMetadata(ReqMethodData, parameterIndex, target, propertyKey);
        if (key) {
            Reflect.defineMetadata(ReqMethodKeyData, key, target, propertyKey);
        }
    }
}

export function HttpTransformRequest(transformRequest: (data: any) => any) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(ReqHttpTransformRequest, transformRequest, target, propertyKey);
    }
}

export function HttpBaseUrl(baseUrl: string) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(ReqHttpBaseUrl, baseUrl, target, propertyKey);
    }
}
