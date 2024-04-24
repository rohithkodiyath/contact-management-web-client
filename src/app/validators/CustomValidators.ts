import {AbstractControl, FormGroup, ValidatorFn} from "@angular/forms";

export default class CustomValidators{

    public static matchPassword(passwordKey: string, confirmPasswordKey: string) : ValidatorFn {
        return (controls: AbstractControl) => {
            let passwordControl = controls.get(passwordKey);
            let confirmPasswordControl = controls.get(confirmPasswordKey);
            if (confirmPasswordControl.errors && !confirmPasswordControl.errors?.['mismatchedPasswords']) {
                return null;
            }
            if (passwordControl.value ===  confirmPasswordControl.value) {
                confirmPasswordControl.setErrors(null);
            }else{
                confirmPasswordControl.setErrors({mismatchedPasswords: true});
            }
        }
    }


}