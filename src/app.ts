import './styles/styles.scss'
import page from "page";

import AlertViewModel from "./components/AlertViewModel";
import ContactListViewModel from "./components/ContactListViewModel";
import ToastViewModel from "./components/ToastViewModel";
import LoginViewModel from "./components/LoginViewModel";
import NotFoundViewModel from "./components/NotFoundViewModel";
import RegisterViewModel from "./components/RegisterViewModel";
import NavbarViewModel from "./components/NavbarViewModel";
import {checkAuth, checkLocalStorageAuth, redirectIfAuthenticated} from "./middlewares";
import SpinnerViewModel from "./components/SpinnerViewModel";

new AlertViewModel().render('app-message')
new ToastViewModel().render('app-toast')
const navbar = new NavbarViewModel();
const spinner = new SpinnerViewModel();
spinner.render('app-spinner')


page('*', function (ctx: any, next: Function) {
    console.log('Middleware executed on route:', ctx.path);
    next();
});


page("/", checkLocalStorageAuth, redirectIfAuthenticated ,function () {
    new LoginViewModel().render();
})

page("/register", redirectIfAuthenticated ,function (ctx: any) {
    new RegisterViewModel().render().setContext(ctx);
})

page("/contact", checkAuth, function (ctx: any) {
    navbar.render('app-navbar')
    new ContactListViewModel().render().setContext(ctx);
})

page('/logout', checkAuth, function () {
    //delete cookie named `clever-app-user`
    document.cookie = 'clever-app-user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navbar.destroy();
    page.redirect('/');

})


page('*', function () {
    new NotFoundViewModel().render();
})

page()