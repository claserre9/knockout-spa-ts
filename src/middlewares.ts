import {getCookie} from "./components/Utilities";
import page from "page";

export function checkAuth(ctx: any, next: Function) {
    if (!getCookie('clever-app-user')) {
        console.log('No cookie found, redirecting to login');
        page.redirect('/');
    } else {
        next();
    }
}

export function checkLocalStorageAuth(ctx: any, next: Function) {
    if (!localStorage.getItem('clever-app-user')) {
        console.log('No local storage item found, redirecting to register');
        page.redirect('/register');
    } else {
        next();
    }
}

export function redirectIfAuthenticated(ctx: any, next: Function) {
    if (getCookie('clever-app-user')) {
        console.log('Cookie found, redirecting to contact');
        page.redirect('/contact');
    } else {
        next();
    }
}