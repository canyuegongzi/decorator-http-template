import {createHttpDecoratorFunction} from "./common/createHttpDecoratorFunction";

export function HttpPost(url: string, data?: any, options: string[] = []) {
    return createHttpDecoratorFunction('POST', url, data, options)
}

export function HttpGet(url: string, data?: any, options: string[] = []) {
    return createHttpDecoratorFunction('GET', url, data, options)
}

export function HttpDelete(url: string, data?: any, options: string[] = []) {
    return createHttpDecoratorFunction('DELETE', url, data, options)
}

export function HttpOptions(url: string, data?: any, options: string[] = []) {
    return createHttpDecoratorFunction('OPTIONS', url, data, options)
}

export function HttpPatch(url: string, data?: any, options: string[] = []) {
    return createHttpDecoratorFunction('PATCH', url, data, options)
}


