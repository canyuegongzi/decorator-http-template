import 'reflect-metadata';
import {
    HttpTemplateMethod,
    ResMethodKey,
    ReqMethodQuery,
    ReqMethodParams,
    ReqMethodData,
    ReqMethodHeaders,
    CommonHttpTemplate,
    ReqHttpTransformRequest,
    ReqMethodKeyData,
    ReqMethodKeyParams,
    ReqMethodKeyQuery, ReqHttpBaseUrl, ResHttpResponseType
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
            const { reqDataKey, reqParamsKey, responseType, reqQueryKey, baseUrl, reqHttpTransform, requestConfig,reqParamsIndex,reqQueryIndex,resIndex,reqDataIndex } = getMetadata(target, propertyKey)
            try {
                const args: Array<any> = [...arguments]
                let query: any = {};
                let params: any = {};
                let postData: any = {};
                let httpUrl = url;
                // path 参数
                if (reqQueryIndex >= 0) {
                  const dataObj = getHttpData(type, httpUrl, args[reqQueryIndex], reqQueryKey);
                  query = dataObj.data;
                  httpUrl = dataObj.httpUrl;
                }
                // params 对象
                if (reqParamsIndex >= 0) {
                    const dataObj = getHttpData(type, httpUrl, args[reqParamsIndex], reqParamsKey);
                    params = dataObj.data;
                    httpUrl = dataObj.httpUrl;
                }
                // post data数据
                if (reqDataIndex >= 0) {
                    const dataObj=  getHttpData(type, httpUrl, args[reqDataIndex], reqDataKey);
                    httpUrl = dataObj.httpUrl;
                    postData = dataObj.data
                }
                const requestHttpConfig: any = [...requestConfig, ...options]
                const res: any = await requestData(type, baseUrl ? baseUrl + httpUrl: httpUrl, { query, params, postData}, requestHttpConfig, reqHttpTransform, responseType)
                if (isEmptyFunction(method) || resIndex === undefined || resIndex < 0) {
                    return res;
                }
                if (resIndex >= 0) args.splice(resIndex, 1, res)
                return method.apply(this, args)
            } catch (error) {
                console.warn(error);
                throw error
            }
        }
    }
}

/**
 * 获取请求数据
 * @param type
 * @param httpUrl
 * @param data
 * @param key
 */
export const getHttpData = (type: HttpTemplateMethod, httpUrl: string, data: any, key?: string) => {
    for (const k in data) {
        httpUrl.replace(`:${key}`, data[key])
    }
    if(key) {
        const result: any = {};
        result[key] = data[key];
        return {data: result, httpUrl};
    }
    return {data, httpUrl};
}

/**
 * 获取自定义数据配置
 * @param target
 * @param propertyKey
 *
 */
function getMetadata(target: any, propertyKey: string ) {
    const resIndex: number = Reflect.getOwnMetadata(ResMethodKey, target, propertyKey);
    const reqQueryIndex: number = Reflect.getOwnMetadata(ReqMethodQuery, target, propertyKey);
    const reqParamsIndex: number = Reflect.getOwnMetadata(ReqMethodParams, target, propertyKey);
    const reqDataIndex: number = Reflect.getOwnMetadata(ReqMethodData, target, propertyKey);
    const reqDataKey: string = Reflect.getOwnMetadata(ReqMethodKeyData, target, propertyKey);
    const reqParamsKey: string = Reflect.getOwnMetadata(ReqMethodKeyParams, target, propertyKey);
    const reqQueryKey: string = Reflect.getOwnMetadata(ReqMethodKeyQuery, target, propertyKey);
    const reqHttpTransform: number = Reflect.getOwnMetadata(ReqHttpTransformRequest, target, propertyKey);
    const baseUrl: string = Reflect.getOwnMetadata(ReqHttpBaseUrl, target, propertyKey);
    const responseType: ResponseType = Reflect.getOwnMetadata(ResHttpResponseType, target, propertyKey);
    const requestConfig: string[] = Reflect.getOwnMetadata(ReqMethodHeaders, target, propertyKey) || {};
    return { reqDataKey, reqParamsKey, responseType, reqQueryKey, baseUrl, reqHttpTransform, requestConfig,reqParamsIndex,reqQueryIndex,resIndex,reqDataIndex}
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
 * @param reqHttpTransform
 * @param responseType
 */
export function requestData(type, url, data, options, reqHttpTransform, responseType) {
    return new Promise(async (resolve, reject) => {
        const { query, params, postData } = data;
        const config: any = getConfig(options);
        const requestData: any = {
            url: url,
            method: type,
            headers: config,
            params: params,
            data: postData,
            responseType: responseType || 'json'
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

function matchHttpUrl(baseUrl: string, ) {

}
