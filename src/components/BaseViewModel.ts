import {applyBindings, cleanNode, dataFor} from 'knockout';

export default class BaseViewModel {

    public template: string | undefined | null
    public context : any
    public selector: any

    render(selector: string = 'app'): this {
        this.selector = selector;
        this.load(selector);
        return this;
    }

    destroy(){
        const element = document.getElementById(this.selector);
        if (element) {
            cleanNode(element);
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        } else {
            console.error(`Element with id "${this.selector}" not found.`);
        }
    }

    setContext(context: any): this {
        this.context = context;
        return this;
    }

    observableFrom(selector: string) {
        const element = document.getElementById(selector);
        if (!element) {
            return null;
        }
        return dataFor(element);
    }

    private load(selector: string): void {
        const container = document.getElementById(selector);
        if (container && typeof this.template === "string") {
            container.innerHTML = this.template;
            cleanNode(container);
            applyBindings(this, container);
        } else {
            console.error(`Element with id "${selector}" not found.`);
        }

    }
}