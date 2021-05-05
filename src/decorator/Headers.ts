import {ReqMethodHeaders} from "../types/module";
import 'reflect-metadata';

export function HttpHeader(headers: string | string[]) {
    return headerDecoratorFactory(headers);
}

function headerDecoratorFactory(headers: string | string[]) {
    return function (target: any, propertyKey: string) {
        const headersConfig: string[] = typeof headers === 'string'? [headers]: headers;
        Reflect.defineMetadata(ReqMethodHeaders, headersConfig, target, propertyKey);
    }
}
