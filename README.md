## 网络请求装饰器
### 使用

```
npm install @canyuegongzi/decorator-http-template

```
### 方法装饰器列表

* HttpHeader(headers: string | string[])；
* HttpPost(url: string, data?: any, options?: string[])；
* HttpGet(url: string, data?: any, options?: string[])；
* HttpDelete(url: string, data?: any, options?: string[])；
* HttpOptions(url: string, data?: any, options?: string[])；
* HttpPatch(url: string, data?: any, options?: string[])；
* HttpTransformRequest(transformRequest: (data: any) => any)；
* HttpBaseUrl(baseUrl: string)；
* HttpResponseType(type?: ResponseType)；

### 参数装饰器

* HttpQuery(key?: string)；
* HttpParams(key?: string)；
* HttpPostData(key?: string)；
* HttpRes()；


```
import {HttpBaseUrl, HttpHeader, HttpPost, HttpPostData, HttpRes, HttpResponseType} from "../dist";

describe('header test', function () {
    beforeEach(() => {
        process.env.NODE_ENV = 'test';
    })
    test('post method test', async function () {
        expect.assertions(1);
        class TestHeader {
            @HttpHeader('Content-Type: application/json')
            @HttpBaseUrl('http://127.0.0.1:3000')
            @HttpPost('/login')
            @HttpResponseType('json')
            public async test(@HttpPostData('username') postData, @HttpRes() res?) {
                return res.data;
            }
        }
        const testInstance = new TestHeader()
        const res = await testInstance.test({username: 'userName1', password: 123456});
        expect(res.data.username === 'userName1').toBe(true);
    });
})
```

