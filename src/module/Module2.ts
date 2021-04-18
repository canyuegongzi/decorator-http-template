import {CommonModule} from "./common/CommonModule";

export class Module2 extends CommonModule{
    constructor() {
        super();
    }

    public init(): void {
        console.log('module2 init');
    }

    protected afterCreateModule(): void {
        console.log('module2 init after');
    }

    protected beforeCreateModule(): void {
        console.log('module2 init before');
    }

}

