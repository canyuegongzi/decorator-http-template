import HttpTemplate from "../../module/HttpTemplate";
import {normalize} from "../../utils";
import {HttpTemplateMethod} from "../../types/module";

// 网络请求实体
const http = HttpTemplate({}).httpInstance;

/**
 * 网络请求
 * @param requestPath
 * @param requestMethod
 * @constructor
 */
export function Request(requestPath: string, requestMethod: HttpTemplateMethod) {
    return function(target, prop, descriptor) {
        const method: HttpTemplateMethod = requestMethod || "GET";
        const path: string = requestPath || prop;
        descriptor.value = function() {
            if (arguments.length > 1) {
                throw `can not call this function with argument more than one`;
            }
            if (arguments.length == 1 && Object.prototype.toString.call(arguments[0]) !== "[object Object]") {
                console.warn("the param  only one will be ignore if you call this function with a basic data-type ");
            }
            let url = "";
            const controller = Reflect.getMetadata("controller", target);
            const headers = Reflect.getMetadata("headers", target, prop);
            let rewritePath = Reflect.getMetadata("rewritePath", target, prop);
            const responseType = Reflect.getMetadata("responseType", target, prop);
            const hasRequestBody = ["post", "put", "patch"].includes(method.toLowerCase());
            //自动忽略非对象参数
            const arg = Object.prototype.toString.call(arguments[0]) === "[object Object]" ? arguments[0] : {};
            //用作放在请求体上的数据
            const data = hasRequestBody ? arg : undefined;
            //用作放在查询字符串的数据
            const params = hasRequestBody ? {} : arg;
            //对于post这类请求，强制通过params传递给后端的数据，
            const reserveAsParams = Reflect.getMetadata("params", target, prop);
            if (hasRequestBody && Array.isArray(reserveAsParams)) {
                //将指定的key从data拷贝到params上去
                reserveAsParams.forEach((key) => {
                    params[key] = data[key];
                    delete data[key];
                });
            }
            controller && (url += `${normalize(controller)}`);
            url += `${normalize(path)}`;
            //如果需要对URL进行重写的话，处理需要进行重写的部分，剩余的部分
            if (rewritePath) {
                const eties = Object.entries(params);
                eties.forEach(([prop, value]) => {
                    const regExp = new RegExp("\\$\\{" + prop + "\\}");
                    //如果能匹配到的话，说明此参数需要进行重写，需要从params里面移除
                    if (regExp.test(rewritePath)) {
                        delete params[prop];
                    }
                    rewritePath = rewritePath.replace(regExp, value);
                });
                //合并重写的path
                url += `${normalize(rewritePath)}`;
            }
            // @ts-ignore
            return http({
                url,
                method,
                data,
                headers,
                responseType,
                //如果没有一个需要通过queryString发送给后台的数据，则不会处理查询字符串
                params: Object.keys(params).length > 0 ? params : undefined,
            });
        };
        return descriptor;
    };
}
