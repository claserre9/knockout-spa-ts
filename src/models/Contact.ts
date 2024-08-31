import {observable} from "knockout";


export default class Contact {
    private readonly _firstName: KnockoutObservable<string>;
    private readonly _lastName: KnockoutObservable<string>;
    private readonly _email: KnockoutObservable<string>;
    private readonly _phoneNumber: KnockoutObservable<string>;

    constructor(firstName: string ='', lastName: string  ='' , email: string  ='' , phoneNumber: string  ='') {
        this._firstName = observable(firstName);
        this._lastName = observable(lastName);
        this._email = observable(email);
        this._phoneNumber = observable(phoneNumber);
    }

    public getFullName(): string {
        return this._firstName() + " " + this._lastName();
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