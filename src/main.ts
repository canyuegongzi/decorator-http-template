import HttpTemplate from "./module/HttpTemplate";
import {HttpGet, HttpPost, HttpPostData, HttpQuery, HttpRes, HttpTransformRequest} from "./decorator";
import {HttpHeader} from "./decorator/Headers";
import Qs from 'qs';

function httpTransformRequest(data: any) {
    return Qs.stringify(data);
}
class Test {

    @HttpHeader('Accept: application/json')
    @HttpGet('', {}, [])
    getData(@HttpQuery query, @HttpRes res?) {
        return res;
    }

    // @HttpHeader('Accept: application/json')
    // @HttpTransformRequest(httpTransformRequest)
    @HttpHeader('Content-Type: application/x-www-form-urlencoded')
    @HttpPost('http://127.0.0.1:3000/login', {}, [])
    login(@HttpPostData postData, @HttpRes res?) {
        return res;
    }
}
async function bootstrap() {
    const http = HttpTemplate({});

    const test = new Test();

    // const da: any = await test.getData({offset: 1})
    // console.log(da);

    const loginInfo: any = await test.login({username: 'userName', password: 123456})

    console.log(loginInfo.data)
}
bootstrap().then(() => {});

