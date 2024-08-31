import Sammy from 'sammy';
import HomeViewModel from "./components/HomeViewModel";
import MessageViewModel from "./components/MessageViewModel";
import ContactListViewModel from "./components/ContactListViewModel";
const MAIN_SELECTOR = 'app';

const messageViewModel = new MessageViewModel();

messageViewModel.render('app-message')

const app = Sammy(MAIN_SELECTOR, function(this: Sammy.Application) {

    this.get('/', function() {
        new HomeViewModel().render();
    });

    this.get('contact', function () {
        new ContactListViewModel().render();
    })

    this.get('about', function() {
        console.log('Route: About');
    });
});

app.run();