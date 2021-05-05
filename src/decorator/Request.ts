import {
    ReqHttpTransformRequest,
    ReqMethodData,
    ReqMethodParams,
    ReqMethodQuery
} from "../types/module";
import 'reflect-metadata';


export function HttpQuery(target: any, propertyKey: string | symbol, parameterIndex: number) {
    Reflect.defineMetadata(ReqMethodQuery, parameterIndex, target, propertyKey);
}

export function HttpParams(target: any, propertyKey: string | symbol, parameterIndex: number) {
    Reflect.defineMetadata(ReqMethodParams, parameterIndex, target, propertyKey);
}

export function HttpPostData(target: any, propertyKey: string | symbol, parameterIndex: number) {
    Reflect.defineMetadata(ReqMethodData, parameterIndex, target, propertyKey);
}

export function HttpTransformRequest(transformRequest: any) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(ReqHttpTransformRequest, transformRequest, target, propertyKey);
    }
}
