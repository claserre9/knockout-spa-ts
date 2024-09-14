import BaseViewModel from "./BaseViewModel";
import {clearFormData, setFormData} from "./Utilities";
import page from "page";
import AlertViewModel from "./AlertViewModel";

export default class LoginViewModel extends BaseViewModel{
    constructor() {
        super();
        this.template = `
<div class="container">
    <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title text-center">Login</h5>
                    <form data-bind="submit : login">
                        <div class="mb-3">
                            <label for="inputEmail" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="inputEmail" name="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="inputPassword" class="form-label">Password</label>
                            <input type="password" class="form-control" id="inputPassword" name="password" required>
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary">Login</button>
                        </div>
                           <p class="text-center my-3">Don't have an account yet! Register <a href="/register">here</a></p>
                    </form>
                </div>
            </div>
        </div>   
    </div>
</div>
`
    }

    public login(formElement: HTMLFormElement): void {
        const formData: { [key: string]: any } = {};
        setFormData(formElement, formData);
        const {email, password} = formData
        console.log(email, password);

        const storedUserObj = JSON.parse(<string>localStorage.getItem('clever-app-user')) as {email: string, password: string};

        if(storedUserObj.email == email){
            //create cookie name 'clever-app-user'
            document.cookie = `clever-app-user=${email}; path=/`;
            page.redirect("/contact");
        }else{
            const messageViewModel = this.observableFrom('app-message') as AlertViewModel;
            messageViewModel.danger("User not found", 5);
        }


        clearFormData(formElement)

    }
}