import BaseViewModel from "./BaseViewModel";
import {observable} from "knockout";

export default class SpinnerViewModel extends BaseViewModel{

    private _showLoading : KnockoutObservable<boolean> = observable(false);

    constructor() {
        super();

        this.template = `
<!-- ko if: showLoading -->
<div class="d-flex justify-content-center align-items-center vh-100 vw-100 position-fixed top-0 start-0 bg-white bg-opacity-75" style="z-index: 1050;">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
</div>
<!-- /ko -->
        `
    }

    get showLoading(): boolean {
        return this._showLoading();
    }

    set showLoading(value: boolean) {
        this._showLoading(value);
    }

    loading(value: boolean) {
        this._showLoading(value);
    }
}