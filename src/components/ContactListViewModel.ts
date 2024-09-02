import BaseViewModel from "./BaseViewModel";
import {observable, observableArray} from "knockout";
import Contact from "../models/Contact";
import AlertViewModel from "./AlertViewModel";


export default class ContactListViewModel extends BaseViewModel{
    public contacts : KnockoutObservableArray<Contact>;
    public selectedContact : KnockoutObservable<Contact>


    constructor() {
        super();
        this.contacts = observableArray([
            new Contact("John", "Doe", "johndoe@gmail.com", "123456789"),
        ])
        this.selectedContact = observable(new Contact());

        this.template = `
<div class="container">

<button type="button" class="btn btn-primary my-4" data-bs-toggle="modal" data-bs-target="#addContactModal">Add new contact</button>

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
                <th scope="col">Id</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody data-bind="foreach:contacts">
            <tr>
                <td data-bind="text:id"></td>
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
        this.setFormData(formElement, formData);
        const {firstName, lastName, email, phoneNumber } = formData
        // @ts-ignore
        this.contacts.push(new Contact(firstName, lastName, email, phoneNumber));
        this.clearFormData(formElement)
        this.closeModal('addContactModal');
    }

    public showEditContact(contact : Contact){
        this.selectedContact(contact)
    }

    public editContact(formElement: HTMLFormElement){
        const formData: { [key: string]: any } = {};
        this.setFormData(formElement, formData);
        this.updateContact(formData);

        this.clearFormData(formElement)
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
            messageViewModel.message("Contact successfully removed");
            messageViewModel.type("success");
            setTimeout(() => {
                messageViewModel.message("");
            }, 3000)

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

    private setFormData(formElement: HTMLFormElement, formData: { [p: string]: any }) {
        for (let i = 0; i < formElement.elements.length; i++) {
            const element = formElement.elements[i] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

            if (element.name) {
                formData[element.name] = element.value;
            }
        }
    }

    private clearFormData(formElement: HTMLFormElement) {
        for (let i = 0; i < formElement.elements.length; i++) {
            const element = formElement.elements[i] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

            if (element.name) {
                element.value = '';
            }
        }
    }
}