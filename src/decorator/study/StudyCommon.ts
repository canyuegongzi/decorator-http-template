import {METHOD_METADATA, PATH_METADATA} from "./CommonConstant";

/**
 * 控制器
 * @param path
 * @constructor
 */
const Controller = (path: string): ClassDecorator => {
    return target => {
        Reflect.defineMetadata(PATH_METADATA, path, target);
    }
}

/**
 * 创建请求类型装饰器
 * @param method
 */
const createMappingDecorator = (method: string) => (path: string): MethodDecorator => {
    return (target, key, descriptor) => {
        Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
        Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);
    }
}


const HttpGet = createMappingDecorator('GET');
const HttpPost = createMappingDecorator('POST');
