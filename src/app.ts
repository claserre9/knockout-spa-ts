import Sammy from 'sammy';
import AlertViewModel from "./components/AlertViewModel";
import ContactListViewModel from "./components/ContactListViewModel";
const MAIN_SELECTOR = 'app';

new AlertViewModel().render('app-message')

const app = Sammy(MAIN_SELECTOR, function(this: Sammy.Application) {

    this.get('/', function () {
        new ContactListViewModel().render();
    })

});

app.run();