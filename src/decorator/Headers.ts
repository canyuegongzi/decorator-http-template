import {ReqMethodHeaders} from "../types";
import 'reflect-metadata';

/**
 * 请求头部
 * @param headers<string[] | string>
 * @constructor
 */
export function HttpHeader(headers: string | string[]) {
    return headerDecoratorFactory(headers);
}

function headerDecoratorFactory(headers: string | string[]) {
    return function (target: any, propertyKey: string) {
        const headersConfig: string[] = typeof headers === 'string'? [headers]: headers;
        Reflect.defineMetadata(ReqMethodHeaders, headersConfig, target, propertyKey);
    }
}
