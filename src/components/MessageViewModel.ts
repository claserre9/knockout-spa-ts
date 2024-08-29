import BaseViewModel from "./BaseViewModel";
import ko from "knockout";

export default class MessageViewModel extends BaseViewModel{
    public message : KnockoutObservable<any>;
    constructor() {
        super();
        this.message = ko.observable();
        this.template = `
        <div class="message" data-bind="text:message"></div>
        `

    }

}