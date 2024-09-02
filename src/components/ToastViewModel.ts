import {Toast} from "bootstrap";
import BaseViewModel from "./BaseViewModel";
import {observable} from "knockout";

export default class ToastViewModel extends BaseViewModel{

    private readonly message: KnockoutObservable<string>;

    constructor(message: string = '') {
        super();
        this.message = observable(message);
        this.template = `
<div aria-live="polite" aria-atomic="true" class="position-relative">
    <div class="toast-container top-0 end-0 p-3">
        <div id="toast" class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body" data-bind="text: message"></div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>
</div>
`
    }

    private showToast(message: string, delayInSeconds: number): void {
        this.message(message);
        const toast = document.getElementById('toast') as HTMLElement;
        if (toast) {
            const toastBootstrap = Toast.getOrCreateInstance(toast);
            if (toastBootstrap) {
                toastBootstrap.show();
                if (delayInSeconds > 0) {
                    setTimeout(() => {
                        toastBootstrap.hide();
                    }, delayInSeconds * 1000);
                }
            }
        }
    }

    public show(message: string, delayInSeconds: number = 0): void {
        this.showToast(message, delayInSeconds);
    }
}