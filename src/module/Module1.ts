import {CommonModule} from "./common/CommonModule";

export class Module1 extends CommonModule{
    constructor() {
        super();
    }

    public init(): void {
        console.log('module1 init');
    }

    protected afterCreateModule(): void {
        console.log('module1 init after');
    }

    protected beforeCreateModule(): void {
        console.log('module1 init before');
    }

}

