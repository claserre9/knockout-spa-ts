import BaseViewModel from "./BaseViewModel";
import {observable} from "knockout";
import {clearFormData, setFormData} from "./Utilities";
import AlertViewModel from "./AlertViewModel";
import page from "page";

export default class RegisterViewModel extends BaseViewModel{

    private _username : KnockoutObservable<string> = observable('')
    private _email : KnockoutObservable<string> = observable('')
    private _password : KnockoutObservable<string> = observable('')
    private _confirmPassword : KnockoutObservable<string> = observable('')


    get username(): string {
        return this._username();
    }

    set username(value: string) {
        this._username(value);
    }

    get email():string {
        return this._email();
    }

    set email(value: string) {
        this._email(value);
    }

    get password(): string {
        return this._password();
    }

    set password(value: string) {
        this._password(value);
    }

    get confirmPassword(): string {
        return this._confirmPassword();
    }

    set confirmPassword(value: string) {
        this._confirmPassword(value);
    }

    constructor() {
        super();

        this.template = `
<div class="container">
    <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title text-center">Register</h5>
                    <form data-bind="submit: register">
                        <div class="mb-3">
                            <label for="inputUsername" class="form-label">Username</label>
                            <input type="text" class="form-control" id="inputUsername" name="username" required>
                        </div>
                        <div class="mb-3">
                            <label for="inputEmail" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="inputEmail" name="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="inputPassword" class="form-label">Password</label>
                            <input type="password" class="form-control" id="inputPassword" name="password" required>
                        </div>
                        <div class="mb-3">
                            <label for="inputConfirmPassword" class="form-label">Confirm Password</label>
                            <input type="password" class="form-control" id="inputConfirmPassword" name="confirmPassword" required>
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
        `
    }

    public register(formElement: HTMLFormElement): void {
        const formData: { [key: string]: any } = {};
        setFormData(formElement, formData);
        const {username, email, password, confirmPassword } = formData
        console.log(username, email, password, confirmPassword);

        if(password != confirmPassword){
            const messageViewModel = this.observableFrom('app-message') as AlertViewModel;
            messageViewModel.danger("Passwords are not the same", 3);
            clearFormData(formElement)
            return
        }


        clearFormData(formElement)

        //store user in local storage
        localStorage.setItem('clever-app-user', JSON.stringify({username, email}));
        page.redirect("/");


    }
}