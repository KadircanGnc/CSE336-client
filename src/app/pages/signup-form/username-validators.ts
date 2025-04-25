import { FormControl } from "@angular/forms";

export class UsernameValidators {

    static cannotContainSpace(control: FormControl) {
        if ((control.value as string).indexOf(' ') >= 0) {
        return { cannotContainSpace: true };
        }
        return null;
    }
    
    static shouldBeUnique(control: FormControl) {
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (control.value === 'kadir') {
            resolve({ shouldBeUnique: true });
            } else {
            resolve(null);
            }
        }, 2000);
        });
    }
}
