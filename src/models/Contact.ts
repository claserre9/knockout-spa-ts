import {observable} from "knockout";
import { v4 as uuidv4 } from 'uuid';



export default class Contact {
    private readonly _firstName: KnockoutObservable<string>;
    private readonly _lastName: KnockoutObservable<string>;
    private readonly _email: KnockoutObservable<string>;
    private readonly _phoneNumber: KnockoutObservable<string>;
    private readonly _id: KnockoutObservable<string>;

    constructor(firstName: string ='', lastName: string  ='' , email: string  ='' , phoneNumber: string  ='') {
        this._firstName = observable(firstName);
        this._lastName = observable(lastName);
        this._email = observable(email);
        this._phoneNumber = observable(phoneNumber);
        this._id = observable(uuidv4());
    }

    public getFullName(): string {
        return this._firstName() + " " + this._lastName();
    }


    get id(): string {
        return this._id();
    }

    get firstName(): string {
        return this._firstName();
    }

    set firstName(value: string) {
        this._firstName(value);
    }

    get lastName(): string {
        return this._lastName();
    }

    set lastName(value: string) {
        this._lastName(value);
    }

    get email(): string {
        return this._email();
    }

    set email(value) {
        this._email(value);
    }

    get phoneNumber(): string {
        return this._phoneNumber();
    }

    set phoneNumber(value: string) {
        this._phoneNumber(value);
    }

    reset(){
        this._firstName('');
        this._lastName('');
        this._email('');
        this._phoneNumber('');
    }
}