import Sammy from 'sammy';
import HomeViewModel from "./components/HomeViewModel";
import MessageViewModel from "./components/MessageViewModel";
const MAIN_SELECTOR = 'app';

const messageViewModel = new MessageViewModel();
messageViewModel.render('app-message')

const app = Sammy(MAIN_SELECTOR, function(this: Sammy.Application) {
    this.get('/', function() {
        console.log('Route: Home');
        new HomeViewModel().render(MAIN_SELECTOR);
    });
    this.get('/about', function() {
        console.log('Route: About');
    });
});

app.run();