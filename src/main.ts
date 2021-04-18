import {Module1} from "./module/Module1";
import {Module2} from "./module/Module2";

function bootstrap() {
    const module1 = new Module1();
    const module2 = new Module2();
    module1.init();
    console.log(55);
    module2.init();
}
bootstrap();

