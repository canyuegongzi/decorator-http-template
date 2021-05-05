import {ResMethodKey} from "../types/module";


export function Res(target: any, propertyKey: string | symbol, parameterIndex: number) {
    Reflect.defineMetadata(ResMethodKey, parameterIndex, target, propertyKey);
}
