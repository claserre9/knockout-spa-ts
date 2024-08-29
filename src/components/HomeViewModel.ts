import BaseViewModel from "./BaseViewModel";
import ko from "knockout";
export default class HomeViewModel extends BaseViewModel{
    public pageContent : KnockoutObservable<any>
    constructor() {
        super();
        this.pageContent = ko.observable("Home");
        this.template = `
        <div data-bind="text:pageContent"></div>
        <button data-bind="click : showMessage">Show Message</button>
        `
    }

    showMessage(data: any) {
        console.log(data);
        console.log("showMessage");
        let messageViewModel = this.observableFrom('app-message');
        messageViewModel.message("This is the message from message view model");
    }

}