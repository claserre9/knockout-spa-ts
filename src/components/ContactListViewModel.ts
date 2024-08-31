import BaseViewModel from "./BaseViewModel";
import {observableArray} from "knockout";
import Contact from "../models/Contact";


export default class ContactListViewModel extends BaseViewModel{
    public contacts : KnockoutObservable<any>;
    //public newContact : Contact;

    constructor() {
        super();
        this.contacts = observableArray([
            new Contact("John", "Doe", "johndoe@gmail.com", "123456789")
        ])

        this.template = `
<div class="container">

<button type="button" class="btn btn-primary my-4" data-bs-toggle="modal" data-bs-target="#addContactModal">Add new contact</button>

<div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="addContactModal" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="addContactModal">Add New Contact</h1>
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

    <table class="table">
        <thead>
            <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email</th>
            </tr>
        </thead>
        <tbody data-bind="foreach:contacts">
            <tr>
                <td data-bind="text:firstName"></td>
                <td data-bind="text:lastName"></td>
                <td data-bind="text:phoneNumber"></td>
                <td data-bind="text:email"></td>
            </tr>  
        </tbody>
    </table>
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
        this.closeAddContactModal();
    }

    private closeAddContactModal() {
        const addContactModal = document.getElementById('addContactModal') as HTMLElement;
        if (addContactModal) {
            const closeBtn = document.querySelector('button[data-bs-dismiss="modal"]') as HTMLButtonElement
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