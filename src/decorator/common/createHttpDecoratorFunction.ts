import 'reflect-metadata';
import {
    HttpTemplateMethod,
    ResMethodKey,
    ReqMethodQuery,
    ReqMethodParams,
    ReqMethodData,
    ReqMethodHeaders, CommonHttpTemplate, ReqHttpTransformRequest
} from "../../types/module";
import {isEmptyFunction} from "../../utils/check";
import HttpTemplate from "../../module/HttpTemplate";
import {AxiosInstance, AxiosResponse} from "axios";
const httpClient: CommonHttpTemplate = HttpTemplate({});
const httpInstance: AxiosInstance = httpClient.getHttpInstance();

/**
 * 创建请求装饰器
 * @param type<HttpTemplateMethod> 请求类型
 * @param url<String> 请求url
 * @param data<Object> 请求参数
 * @param options<Object> 配置
 */
export const createHttpDecoratorFunction = (type: HttpTemplateMethod, url: string, data: any = {}, options: string[] = []) => {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const method: any = descriptor.value;
        descriptor.value = async function () {
            const resIndex: number = Reflect.getOwnMetadata(ResMethodKey, target, propertyKey);
            const reqQueryIndex: number = Reflect.getOwnMetadata(ReqMethodQuery, target, propertyKey);
            const reqParamsIndex: number = Reflect.getOwnMetadata(ReqMethodParams, target, propertyKey);
            const reqDataIndex: number = Reflect.getOwnMetadata(ReqMethodData, target, propertyKey);
            const reqHttpTransform: number = Reflect.getOwnMetadata(ReqHttpTransformRequest, target, propertyKey);
            const requestConfig: string[] = Reflect.getOwnMetadata(ReqMethodHeaders, target, propertyKey) || {};
            try {
                const args: Array<any> = [...arguments]
                let query: any = {};
                let params: any = {};
                let postData: any = {};
                // path 参数
                if (reqQueryIndex >= 0) query = getHttpData(type, args[reqQueryIndex]);
                // params 对象
                if (reqParamsIndex >= 0) params = getHttpData(type, args[reqParamsIndex]);
                // post data数据
                if (reqDataIndex >= 0) postData = getHttpData(type, args[reqDataIndex]);
                const requestHttpConfig: any = [...requestConfig, ...options]
                const res: any = await requestData(type, url, { query, params, postData}, requestHttpConfig, reqHttpTransform)
                if (isEmptyFunction(method) || resIndex === undefined || resIndex < 0) {
                    return res;
                }
                if (resIndex >= 0) args.splice(resIndex, 1, res)
                return method.apply(this, args)
            } catch (error) {
                throw error
            }
        }
    }
}

/**
 * 获取请求数据
 * @param type
 * @param data
 */
export const getHttpData = (type: HttpTemplateMethod, data: any) => {
    return data;
}

/**
 * 获取配置
 * @param options
 */
export const getConfig = (options: string[]) => {
    return options.reduce((prevValue, header) => {
                const match = header.match(/([^:]+):\s*(.*)/);
                if (!match) {
                    throw new Error(`Invalid header format for '${header}'`);
                }
                const [, name, value] = match;
                if (!prevValue[name]) {
                    prevValue[name] = '';
                }
                prevValue[name] = value;
                return prevValue;
        },
        {} as Record<string, string>
    )
}

/**
 * http 请求实体
 * @param type
 * @param url
 * @param data
 * @param options
 */
export function requestData(type, url, data, options, reqHttpTransform) {
    return new Promise(async (resolve, reject) => {
        const { query, params, postData } = data;
        const config: any = getConfig(options);
        console.log('config', config);
        console.log('params', params);
        console.log('query', query);
        console.log('postData', postData);
        const requestData: any = {
            url: url,
            method: type,
            headers: config,
            params: params,
            data: postData
        }
        if (reqHttpTransform) {
            reqHttpTransform['transformRequest'] = reqHttpTransform;
        }
        httpInstance.request(requestData).then((res: AxiosResponse) => {
            resolve(res);
        }).catch(e => {
            reject(e);
        })
    })
}
