import BaseViewModel from "./BaseViewModel";
import ContactListViewModel from "./ContactListViewModel";
import Contact from "../models/Contact";

export default class NavbarViewModel extends BaseViewModel{
    constructor() {
        super();
        this.template = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <!-- Search Bar -->
        <div class="d-flex w-100">
            <input class="form-control me-2 flex-grow-1" type="search" placeholder="Search" aria-label="Search" 
            data-bind="event: {input : onTypeChange}">
        </div>
        <!-- Settings Dropdown -->
        <div class="dropdown ms-auto">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" 
            data-bs-toggle="dropdown" aria-expanded="false">Settings</button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                <li><a class="dropdown-item" href="/profile">Profile</a></li>
                <li><a class="dropdown-item" href="/logout">Logout</a></li>
            </ul>
        </div>
    </div>
</nav>
        `
    }

    public onTypeChange(data: any, event: InputEvent) {
        const { value } = event.target as HTMLInputElement;
        const contactListViewModel = this.observableFrom('contact-list') as ContactListViewModel;
        const contacts = contactListViewModel.contacts;
        const searchedContacts = this.searchContacts(contactListViewModel, value);
        contacts([])
        contacts(searchedContacts);

    }

    private searchContacts(contactListViewModel: ContactListViewModel, value: string) {
        return contactListViewModel.fetchContacts().filter((contact: Contact) => {
            return (
                contact.firstName.toLowerCase().includes(value.toLowerCase()) ||
                contact.lastName.toLowerCase().includes(value.toLowerCase()) ||
                contact.email.toLowerCase().includes(value.toLowerCase()) ||
                contact.phoneNumber.toLowerCase().includes(value.toLowerCase())
            );
        });
    }
}