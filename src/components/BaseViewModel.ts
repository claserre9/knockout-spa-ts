import ko from 'knockout';

export default class BaseViewModel {

    public template: string | undefined;

    render(selector: string): void {
        this.load(selector);
    }

    observableFrom(selector : string) {
        const element = document.getElementById(selector);
        if (!element) {
            return null;
        }
        return ko.dataFor(element);
    }

    private load(selector: string): void {
        const container = document.getElementById(selector);
        if (container && typeof this.template === "string") {
            container.innerHTML = this.template;
            ko.cleanNode(container);
            ko.applyBindings(this, container);
        } else {
            console.error(`Element with id "${selector}" not found.`);
        }

    }
}