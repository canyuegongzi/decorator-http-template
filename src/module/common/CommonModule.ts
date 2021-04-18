export abstract class  CommonModule {
    protected constructor() {
        this.beforeCreateModule();
        this.init();
        this.afterCreateModule();
    }
    public abstract init(): void

    protected abstract beforeCreateModule(): void

    protected abstract afterCreateModule(): void
}
