import {applyBindings, cleanNode, dataFor} from 'knockout';

export default class BaseViewModel {

    public template: string | undefined;

    render(selector: string = 'app'): void {
        this.load(selector);
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