import {createHttpDecoratorFunction} from "./common/createHttpDecoratorFunction";
import {HttpTemplateMethod} from "../types/module";

export function Post(url: string, data: any, options: any) {
    return createHttpDecoratorFunction('POST', url, data, options)
}

export function Get(url: string, data: any, options: any) {
    return createHttpDecoratorFunction('GET', url, data, options)
}

export function Fetch(type: HttpTemplateMethod, url: string, data: any, options: any) {
    return createHttpDecoratorFunction(type, url, data, options)
}


