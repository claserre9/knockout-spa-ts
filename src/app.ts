import Sammy from 'sammy';
import AlertViewModel from "./components/AlertViewModel";
import ContactListViewModel from "./components/ContactListViewModel";
import ToastViewModel from "./components/ToastViewModel";
const MAIN_SELECTOR = 'app';

import './styles/styles.scss'

new AlertViewModel().render('app-message')
new ToastViewModel().render('app-toast')

const app = Sammy(MAIN_SELECTOR, function(this: Sammy.Application) {

    this.get('/', function () {
        new ContactListViewModel().render();
    })

});

app.run();