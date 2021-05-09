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

