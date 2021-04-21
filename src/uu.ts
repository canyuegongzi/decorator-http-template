import "reflect-metadata";
//这就是我们正常的对axios的统一封装的实例。
import {http} from "./utils/http";
function hasPrefix(str) {
    return str.startsWith("/");
}

function normalize(str) {
    const url = !hasPrefix(str) ? "/" + str : str;
    return url;
}

/**
 * 定义ResponseType
 * @param responseType 响应的类型
 */
export function ResponseType(responseType) {
    return function(target, prop, descriptor) {
        Reflect.defineMetadata("responseType", responseType, target, prop);
        return descriptor;
    };
}

/**
 * 需要对路由进行RESTful重写的路由
 */
export function RESTful(rewritePath) {
    return function(target, prop, descriptor) {
        Reflect.defineMetadata("rewritePath", rewritePath, target, prop);
        return descriptor;
    };
}

/**
 * 定义Controller
 * @param controller
 */
export function Controller(controller) {
    return function(Target) {
        //记住在controller部分的path
        Reflect.defineMetadata("controller", controller, Target.prototype);
        return Target;
    };
}

/**
 * 定义访问的附加Headers
 * @param headers
 */
export function Headers(headers) {
    return function(target, prop, descriptor) {
        //记住要传递的headers
        Reflect.defineMetadata("headers", headers, target, prop);
        return descriptor;
    };
}

/**
 * 强制指定某些参数作为querystring传递
 * @param {String[]} reserveAsParams
 */
export function Param(reserveAsParams) {
    return function(target, prop, descriptor) {
        //定义要强制作为querystring传递的参数键集合
        Reflect.defineMetadata("params", reserveAsParams, target, prop);
        return descriptor;
    };
}

export function Request(requestPath, requestMethod) {
    /*return function(target, prop, descriptor) {
        const method = requestMethod || "GET";
        const path = requestPath || prop;
        descriptor.value = function() {
            /!**
             *由于目前JS的尚未支持参数装饰器，因此，函数只能接收一个参数，且该参数必须是对象。
             *!/
            //如果参数是多个的话，给出提醒
            if (arguments.length > 1) {
                throw `can not call this function with argument more than one`;
            }
            // 如果蚕食是一个，且是非对象类型的话，这个参数将会被忽略
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
    };*/
}

export function GET(path) {
    return Request(path, "GET");
}

export function POST(path) {
    return Request(path, "POST");
}

export function DELETE(path) {
    return Request(path, "DELETE");
}

export function PUT(path) {
    return Request(path, "PUT");
}

export function HEAD(path) {
    return Request(path, "HEAD");
}

export function PATCH(path) {
    return Request(path, "PATCH");
}

/*@Controller('/app')
export class HomeApi {

    @GET('')
    detail(){}
    /!*
    等价于
    detail(params) {
    	return http({
            url: '/app/detail',
            method: 'get',
            params,
        })
    }
    *!/

    @GET('/list')
    getDataList() {}

    /!*
    等价于
    getDataList(params) {
    	return http({
            url: '/app/list',
            method: 'get',
            params
        })
    }
    *!/

    @POST('/entity')
    saveEntity() {}
    /!*
    等价于
    saveEntity(data) {
        return http({
            url: '/app/list',
            method: 'post',
            data
        })
    }
    *!/

    @GET('/entity')
    @RESTful('/${name}/${age}')
    getEntity(){}
    /!*
    等价于
    getEntity(params = {}){
    	const { name, age, ...rest } = params;
    	return http({
            url:`/app/entity/${name}/${age}`,
            method:'get',
            params: rest,
        });
    }

    *!/

    @GET('/download')
    @ResponseType('blob')
    download(){}

    /!*
    等价于
    download() {
    	return http({
            url: '/app/download',
            method: 'get',
            responseType: 'blob',
        })
    }
    *!/

    @POST('/create')
    @Headers({
        "Content-Type":"application/json"
    })
    save(){}
    /!*
     等价于
     save() {
     	return http({
            url: '/app/create',
            method: 'post',
            headers: {
            	"Content-Type": 'application/json'
            }
        })
     }
    *!/


    @POST('/submit')
    @Param(['time'])
    submit(){}
    /!*
    等价于
    submit(data = {}) {
    	const { time, ...rest } = data;
        return http({
            url: '/app/submit',
            method: 'post',
            data: rest,
            params: {
            	time
            }
        })
     }
    *!/
}*/
