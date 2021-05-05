import HttpTemplate from "./module/HttpTemplate";
import {Get, Query, Res} from "./decorator";

class Test {
    @Get('', {}, {})
    getData(@Query query, @Res res?) {
        console.log('合适数据', res);
        return res;
    }
}

async function bootstrap() {
    const http = HttpTemplate({});

    const test = new Test();

    const da: any = await test.getData({offset: 1})
    console.log(da);
}
bootstrap().then(() => {});

