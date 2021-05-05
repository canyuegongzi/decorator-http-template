import {createHttpDecoratorFunction} from "./common/createHttpDecoratorFunction";
import {HttpTemplateMethod} from "../types/module";

export function HttpPost(url: string, data?: any, options: string[] = []) {
    return createHttpDecoratorFunction('POST', url, data, options)
}

export function HttpGet(url: string, data?: any, options: string[] = []) {
    return createHttpDecoratorFunction('GET', url, data, options)
}

export function HttpFetch(type: HttpTemplateMethod, url: string, data?: any, options: string[] = []) {
    return createHttpDecoratorFunction(type, url, data, options)
}


