import { IContacts } from "../../types";
import { IEvents } from "../base/events";
import { Form } from "../Common/Form";


export class Contacts extends Form<IContacts> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    set email(value: string) {
        const input = this.container.querySelector('input[name="email"]') as HTMLInputElement;
        input.value = value;
    }

    set phone(value: string) {
        const input = this.container.querySelector('input[name="phone"]') as HTMLInputElement;
        input.value = value;
    }
}