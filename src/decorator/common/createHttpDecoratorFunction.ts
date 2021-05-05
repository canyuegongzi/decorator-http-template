import 'reflect-metadata';
import { HttpTemplateMethod, ResMethodKey, ReqMethodQuery, ReqMethodParams, ReqMethodData} from "../../types/module";
import {isEmptyFunction} from "../../utils/check";

/**
 * 创建请求装饰器
 * @param type<HttpTemplateMethod> 请求类型
 * @param url<String> 请求url
 * @param data<Object> 请求参数
 * @param options<Object> 配置
 */
export const createHttpDecoratorFunction = (type: HttpTemplateMethod, url: string, data: any, options: any) => {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const method: any = descriptor.value;
        descriptor.value = async function () {
            const resIndex: number = Reflect.getOwnMetadata(ResMethodKey, target, propertyKey);
            const reqQueryIndex: number = Reflect.getOwnMetadata(ReqMethodQuery, target, propertyKey);
            const reqParamsIndex: number = Reflect.getOwnMetadata(ReqMethodParams, target, propertyKey);
            const reqDataIndex: number = Reflect.getOwnMetadata(ReqMethodData, target, propertyKey);
            try {
                const args: Array<any> = [...arguments]
                let query: any = {};
                let params: any = {};
                let postData: any = {};
                if (reqQueryIndex >= 0) query = getHttpData(type, args[reqQueryIndex]);
                if (reqParamsIndex >= 0) params = getHttpData(type, args[reqQueryIndex]);
                if (reqDataIndex >= 0) postData = getHttpData(type, args[reqQueryIndex]);

                const res: any = await requestData(type, url, data, options)
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
    console.log('这是转换的参数', data);
    return data;
}
export function requestData(type, url, data, options) {
    return new Promise((resolve, reject) => {
        resolve({success: true, data: [1,2,3,4,5,6], message: '操作成功'});
    })
}
