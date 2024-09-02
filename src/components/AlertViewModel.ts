import BaseViewModel from "./BaseViewModel";
import {computed, observable} from "knockout";

export default class AlertViewModel extends BaseViewModel {
    public message: KnockoutObservable<string>;
    public type: KnockoutObservable<string>;
    public level: KnockoutComputed<string>;

    constructor(message: string = '', type: string = 'info') {
        super();
        this.message = observable(message);
        this.type = observable(type)
        this.level = computed(() => {
            return this.getAlertLevel(this.type())
        })
        this.template = `
<!-- ko if: message().length > 0 -->
<div data-bind="class : level " class="alert alert-dismissible fade show" role="alert">
    <strong data-bind="text: message"></strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" data-bind="click:clearMessage"></button>
</div>
<!-- /ko -->
        `
    }

    private clearMessage() {
        this.message("");
    }

    private getAlertLevel(type: string): string {
        switch (type) {
            case "info":
                return "alert-info";
            case "warning":
                return "alert-warning";
            case "success":
                return "alert-success";
            case "primary":
                return "alert-primary";
            case "danger":
                return "alert-danger";
            default:
                return "alert-info";
        }
    }


    public show(message: string, type: string = 'info', delayInSec: number = 0) {
        this.message(message);
        this.type(type);
        if (delayInSec > 0) {
            setTimeout(() => {
                this.clearMessage()
            }, delayInSec * 1000)
        }
    }

    public info(message: string, delayInSec: number = 0) {
        this.show(message, 'info', delayInSec);
    }

    public success(message: string, delayInSec: number = 0) {
        this.show(message, 'success', delayInSec);
    }

    public warning(message: string, delayInSec: number = 0) {
        this.show(message, 'warning', delayInSec);
    }

    public danger(message: string, delayInSec: number = 0) {
        this.show(message, 'danger', delayInSec);
    }

}