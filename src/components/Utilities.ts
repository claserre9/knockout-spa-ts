export function setFormData(formElement: HTMLFormElement, formData: { [p: string]: any }) {
    for (let i = 0; i < formElement.elements.length; i++) {
        const element = formElement.elements[i] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

        if (element.name) {
            formData[element.name] = element.value;
        }
    }
}

export function clearFormData(formElement: HTMLFormElement) {
    for (let i = 0; i < formElement.elements.length; i++) {
        const element = formElement.elements[i] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

        if (element.name) {
            element.value = '';
        }
    }
}

export function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
}
