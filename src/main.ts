import HttpTemplate from "./module/HttpTemplate";
import {
    HttpBaseUrl,
    HttpGet,
    HttpPost,
    HttpPostData,
    HttpQuery,
    HttpRes,
    HttpResponseType,
    HttpTransformRequest,
    HttpHeader
} from "./decorator";
import Qs from 'qs';

function httpTransformRequest(data: any) {
    return Qs.stringify(data);
}
class Test {

    @HttpHeader('Accept: application/json')
    @HttpGet('')
    getData(@HttpQuery() query, @HttpRes() res?) {
        return res;
    }

    @HttpHeader('Content-Type: application/json')
    @HttpBaseUrl('http://127.0.0.1:3000')
    @HttpPost('/login')
    @HttpResponseType('document')
    login1(@HttpPostData('username') postData, @HttpRes() res?) {
        console.log(res.data);
        return res;
    }

    @HttpHeader('Accept: application/json')
    @HttpTransformRequest(httpTransformRequest)
    @HttpHeader('Content-Type: application/x-www-form-urlencoded')
    @HttpPost('http://127.0.0.1:3000/login')
    login2(@HttpPostData() postData, @HttpRes() res?) {
        return res;
    }
}
async function bootstrap() {
    const http = HttpTemplate({});

    const test = new Test();

    // const da: any = await test.getData({offset: 1})
    // console.log(da);

    //const loginInfo: any = await test.login({username: 'userName', password: 123456})
    const loginInfo1: any = await test.login1({username: 'userName1', password: 123456})

    // console.log(loginInfo.data)
    console.log(loginInfo1.data)
}
bootstrap().then(() => {});

