import BaseViewModel from "./BaseViewModel";
import {computed, observable, observableArray, utils} from "knockout";
import Contact from "../models/Contact";
import AlertViewModel from "./AlertViewModel";
import ToastViewModel from "./ToastViewModel";
import {clearFormData, setFormData} from "./Utilities";


export default class ContactListViewModel extends BaseViewModel{
    public contacts : KnockoutObservableArray<Contact> | KnockoutObservableArray<never>;
    public selectedContact : KnockoutObservable<Contact>
    public countIsChecked : KnockoutComputed<number>;


    constructor() {
        super();
        this.contacts = observableArray([
            // new Contact("John", "Doe", "johndoe@gmail.com", "123456789", true),
        ])
        this.countIsChecked = computed(() => {
            return (utils.arrayFilter(this.contacts() as Contact[], (contact: Contact) => contact.isChecked)).length
        })
        this.selectedContact = observable(new Contact());

        this.template = `
<div class="container">

<button type="button" class="btn btn-primary my-4" data-bs-toggle="modal" data-bs-target="#addContactModal">Add new contact</button>
<!-- ko if: countIsChecked -->
<button type="button" class="btn btn-danger my-4" 
    data-bind="text: 'Delete ' + countIsChecked() + ' selected contact(s)', click: deleteSelectedContact  ">Delete</button>
<!-- /ko -->

<div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="addContactModalLabel">Add New Contact</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            <div class="modal-body">
                <form data-bind="submit:addContact">
                
                    <div class="mb-3">
                        <label for="firstName" class="col-form-label">First Name:</label>
                        <input type="text" class="form-control" id="firstName" name="firstName" required>
                    </div>
                    <div class="mb-3">
                        <label for="lastName" class="col-form-label">Last Name:</label>
                        <input type="text" class="form-control" id="lastName" name="lastName" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="col-form-label">Email:</label>
                        <input type="email" class="form-control" id="email" name="email" required>
                    </div>
                    <div class="mb-3">
                        <label for="phoneNumber" class="col-form-label">Phone Number:</label>
                        <input type="text" class="form-control" id="phoneNumber" name="phoneNumber" required>
                    </div>
                    
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Add</button>
                </form>
              </div>

        </div>
    </div>
</div>

<div class="modal fade" id="editContactModal" tabindex="-1" aria-labelledby="editContactModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="editContactModalLabel">Edit Contact</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            <div class="modal-body">
                <form data-bind="submit:editContact">
                    <input data-bind="value: selectedContact().id" type="hidden" class="form-control" id="id" name="id" required>
                    <div class="mb-3">
                        <label for="firstName" class="col-form-label">First Name:</label>
                        <input data-bind="value: selectedContact().firstName" type="text" class="form-control" id="firstName" name="firstName" required>
                    </div>
                    <div class="mb-3">
                        <label for="lastName" class="col-form-label">Last Name:</label>
                        <input data-bind="value: selectedContact().lastName" type="text" class="form-control" id="lastName" name="lastName" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="col-form-label">Email:</label>
                        <input data-bind="value: selectedContact().email" type="email" class="form-control" id="email" name="email" required>
                    </div>
                    <div class="mb-3">
                        <label for="phoneNumber" class="col-form-label">Phone Number:</label>
                        <input data-bind="value: selectedContact().phoneNumber" type="text" class="form-control" id="phoneNumber" name="phoneNumber" required>
                    </div>
                    
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Edit</button>
                </form>
              </div>

        </div>
    </div>
</div>
    
    <!-- ko if: contacts().length > 0 -->
    <table class="table">
        <thead>
            <tr>
                <th scope="col"><input class="form-check-input" type="checkbox" data-bind="event:{ change : onChangeCheckBox }"></th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody data-bind="foreach:contacts">
            <tr>
                <td><input class="form-check-input" type="checkbox" data-bind="checked: isChecked"></td>
                <td data-bind="text:firstName"></td>
                <td data-bind="text:lastName"></td>
                <td data-bind="text:phoneNumber"></td>
                <td data-bind="text:email"></td>
                <td>
                    <button class="btn btn-sm btn-warning" type="button" data-bind="click: function(){$parent.showEditContact($data)}" data-bs-toggle="modal" data-bs-target="#editContactModal">Edit</button>
                    <button class="btn btn-sm btn-danger" type="button" data-bind="click: function(){$parent.deleteContact($data, $parent.contacts)}">Delete</button>
                </td>
            </tr>  
        </tbody>
    </table>
    <!-- /ko -->
    
    <!-- ko if: contacts().length == 0 -->
    <p>No contact</p>
    <!-- /ko -->
</div>
        `
    }

    public addContact(formElement: HTMLFormElement) {
        const formData: { [key: string]: any } = {};
        setFormData(formElement, formData);
        const {firstName, lastName, email, phoneNumber } = formData

        const existingContact = utils.arrayFilter(this.contacts() as Contact[], (contact) => {
            return contact.phoneNumber == phoneNumber || contact.email == email;
        })

        if(existingContact.length > 0){
            const messageViewModel = this.observableFrom('app-message') as AlertViewModel;
            messageViewModel.danger("Contact with same phone or email already exists", 3);
            clearFormData(formElement)
            this.closeModal('addContactModal');
            return
        }

        // @ts-ignore
        this.contacts.push(new Contact(firstName, lastName, email, phoneNumber));
        clearFormData(formElement)
        this.closeModal('addContactModal');
        let toastViewModel = this.observableFrom('app-toast') as ToastViewModel;
        toastViewModel.show("Contact added", 2)
    }

    public showEditContact(contact : Contact){
        this.selectedContact(contact)
    }

    public editContact(formElement: HTMLFormElement){
        const formData: { [key: string]: any } = {};
        setFormData(formElement, formData);
        this.updateContact(formData);

        clearFormData(formElement)
        this.closeModal('editContactModal');
        this.selectedContact(new Contact())
    }


    private updateContact(formData: { [p: string]: any }) {
        const {id, firstName, lastName, email, phoneNumber} = formData

        for (const contact of this.contacts() as Contact[]) {
            if (contact.id === id) {
                contact.firstName = firstName;
                contact.lastName = lastName;
                contact.email = email;
                contact.phoneNumber = phoneNumber;
            }
        }
    }

    public deleteContact(contact : Contact, contacts : KnockoutObservableArray<Contact>) : void {
        const answer = confirm("Are you sure?")
        if(answer){
            contacts.remove(contact);
            let messageViewModel = this.observableFrom('app-message') as AlertViewModel;
            messageViewModel.success("Contact successfully removed", 3);
        }

    }

    private closeModal(elementId : string) {
        const modalElement = document.getElementById(elementId) as HTMLElement;
        if (modalElement) {
            const closeBtn = modalElement.querySelector('button[data-bs-dismiss="modal"]') as HTMLButtonElement
            if (closeBtn) {
                closeBtn.click()
            }
        }
    }



    public onChangeCheckBox(data: any, event: Event) {
        const {checked} = event.target as HTMLInputElement;
        const {contacts} = data as ContactListViewModel;
        utils.arrayForEach(contacts() as Contact[], (contact) => {
            contact.isChecked = checked;
        })
    }

    public deleteSelectedContact(data: any){
        const {contacts} = data as ContactListViewModel;
        const notSelectedContacts = utils.arrayFilter(contacts() as Contact[], (contact) => {
            return !contact.isChecked;
        })
        contacts(notSelectedContacts)
    }
}