## 网络请求装饰器
### 安装

```
npm install @canyuegongzi/decorator-http-template

```
### 使用

该插件使用方式与nest、 angular注解方式类似，只能注解类的成员函数，以此案例：
HttpPost() 注解发送 post 请求；
HttpHeader() 注解标识请求参数为 json 格式；
HttpResponseType() 设置数据返回格式为 json；
HttpBaseUrl() 设置请求前缀公共地址；
HttpPostData() 参数注解标识需要发送的 post 数据；
HttpRes() 参数注解可以直接在函数体中获取到后端的返回数据；

```ts

class TestHeader {
      @HttpHeader('Content-Type: application/json')
      @HttpBaseUrl('http://127.0.0.1:3000')
      @HttpPost('/login')
      @HttpResponseType('json')
      public async test(@HttpPostData('username') postData, @HttpRes() res?) {
          // 函数体累不可以拿到后端返回的数据 该res 是 AxiosResponse；也就是说 res.data 才是真正的 数据结果；
          // 当函数体为空时默认返回 res；使用者也可以在函数内部实现自己的业务逻辑；
          console.log(res);
          return res.data;
      }
}

const testInstance = new TestHeader()
const res = await testInstance.test({username: 'userName1', password: 123456});
```

### 注意：

1. 当函数体为空时，函数默认返回 Response；
2. 此插件只适合注解类成员；

### API

### 方法装饰器列表

* HttpHeader(headers: string | string[])；
```ts
 HttpHeader 主要用于设置请求头部参数
```

* HttpPost(url: string, data?: object, options?: string[])；
```ts
HttpPost 主要用于发送 post 请求， 可以有默认参数和默认头部参数，当需要传递动态参数时，参数必须使用参数注解 HttpPostData ，参考案例使用；
```

* HttpGet(url: string, data?: any, options?: string[])；
```ts
HttpGet 主要用于发送 get 请求， 可以有默认参数和默认头部参数，当需要传递动态参数时，参数必须使用参数注解 HttpParams；
```

* HttpDelete(url: string, data?: any, options?: string[])；
```ts
HttpDelete 主要用于发送 delete 请求， 可以有默认参数和默认头部参数；
```
* HttpOptions(url: string, data?: any, options?: string[])；
```ts
HttpGet 主要用于发送 options 请求；
```
* HttpPatch(url: string, data?: any, options?: string[])；

```ts
HttpGet 主要用于发送 patch 请求
```

* HttpTransformRequest(transformRequest: (data: any) => any)；
```ts
HttpTransformRequest 主要用于发送参数转换作用，参数必须是有返回数据的函数；
```

* HttpBaseUrl(baseUrl: string)；
```ts
HttpBaseUrl 主要用于设置服务地址；
```

* HttpResponseType(type?: ResponseType)；
```ts
HttpResponseType 主要用于设置返回类型；可选值为 arraybuffer | blob | document | json | text |stream；
```
### 参数装饰器

* HttpQuery(key?: string)；

```ts
HttpQuery 主要用于标识需要向后端传递的参数，该注解无参数时默认会将整个修饰对象传递给后端；该注解允许一个字符类型的参数，存在该参数时请求参数只会存在该字段；
```
* HttpParams(key?: string)；
```ts
HttpParams 主要用于标识需要向后端传递的参数，该注解无参数时默认会将整个修饰对象传递给后端；该注解允许一个字符类型的参数，存在该参数时请求参数只会存在该字段；
```  

* HttpPostData(key?: string)；
```ts
HttpPostData 主要用于标识 post 请求时需要向后端传递的参数，该注解无参数时默认会将整个修饰对象传递给后端；该注解允许一个字符类型的参数，存在该参数时请求参数只会存在该字段；
```  

* HttpRes()；
```ts
HttpRes 主要用于获取后端返回的数据，默认是 AxiosResponse 类型
```

