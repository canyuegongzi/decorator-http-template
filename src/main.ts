import HttpTemplate from "./module/HttpTemplate";

function bootstrap() {
    const http = HttpTemplate({});
    console.log(http);
    // console.log(http.httpInstance({}))
}
bootstrap();

