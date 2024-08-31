import BaseViewModel from "./BaseViewModel";
import {observable} from "knockout";

export default class MessageViewModel extends BaseViewModel {
    public message: KnockoutObservable<any>;

    constructor() {
        super();
        this.message = observable();
        this.template = `
        <div class="message" data-bind="text:message"></div>
        `

    }

}