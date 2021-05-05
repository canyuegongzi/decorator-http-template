import {ReqMethodData, ReqMethodParams, ReqMethodQuery} from "../types/module";


export function Query(target: any, propertyKey: string | symbol, parameterIndex: number) {
    Reflect.defineMetadata(ReqMethodQuery, parameterIndex, target, propertyKey);
}

export function Params(target: any, propertyKey: string | symbol, parameterIndex: number) {
    Reflect.defineMetadata(ReqMethodParams, parameterIndex, target, propertyKey);
}

export function PostData(target: any, propertyKey: string | symbol, parameterIndex: number) {
    Reflect.defineMetadata(ReqMethodData, parameterIndex, target, propertyKey);
}
