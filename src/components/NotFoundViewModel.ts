import BaseViewModel from "./BaseViewModel";

export default class NotFoundViewModel extends BaseViewModel{
    constructor() {
        super();

        this.template = `
<div class="container vh-100 d-flex flex-column justify-content-center align-items-center text-dark">
    <h1 class="display-1 fw-bold">404</h1>
    <p class="h4 mb-3">Oops! Page Not Found</p>
    <a href="/" class="btn btn-primary mt-3">Go to Home</a>
</div>
        `;
    }

}