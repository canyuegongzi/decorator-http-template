import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

export const HttpKey = Symbol("Http")
export const ResMethodKey = Symbol("Res")
export const ReqMethodQuery = Symbol("Query")
export const ReqMethodParams = Symbol("Params")
export const ReqMethodData = Symbol("PostData")
export const ReqMethodKeyData = Symbol("PostKeyData")
export const ReqMethodKeyParams = Symbol("PostKeyParams")
export const ReqMethodKeyQuery = Symbol("PostKeyQuery")
export const ReqMethodHeaders = Symbol("RequestHeaders")
export const ReqHttpTransformRequest = Symbol("HttpTransformRequest")
export const ReqHttpBaseUrl = Symbol("HttpBaseUrl")
export const ResHttpResponseType = Symbol("HttpResponseType")

export abstract class CommonHttpTemplate {

    protected constructor(props: CommonHttpTemplateConfig) {}

    public httpInstance: AxiosInstance = null;

    public abstract requestInterceptors(instance: AxiosInstance): AxiosInstance

    public abstract responseInterceptors(instance: AxiosInstance): void

    public abstract createHttp(props: CommonHttpTemplateConfig): AxiosInstance

    public getHttpInstance(): AxiosInstance {
        return this.httpInstance;
    }
}

export interface CommonHttpTemplateConfig extends AxiosRequestConfig {
    timeout?: number;
    requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    responseInterceptors?: (data: AxiosResponse) => any;
    error?: (errType: ErrorType, err: Error) => any
}


export type ErrorType =
    | 'createHttpError' | 'CREATE-HTTP-ERROR'
    | 'promiseHttpError' | 'PROMISE-HTTP-ERROR'
    | 'requestInterceptorsError' | 'REQUEST-INTERCEPTORS-ERROR'
    | 'responseInterceptorsError' | 'RESPONSE-INTERCEPTORS-ERROR'

export type HttpTemplateMethod =
    | 'get' | 'GET'
    | 'delete' | 'DELETE'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'
    | 'purge' | 'PURGE'
    | 'link' | 'LINK'
    | 'unlink' | 'UNLINK'
export type ResponseType =
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream'
