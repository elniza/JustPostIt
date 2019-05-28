
import { FormControl } from '@angular/forms';

export interface ValidationResult {
  [key: string]: boolean;
}

export class FormValidator {

  public static startsWithLetter(control: FormControl): ValidationResult {
    let startsWithLetter = /^[a-zA-Z]/.test(control.value);
    if (!startsWithLetter) {
      // return what´s not valid
      return { startsWithLetter: true };
    }
    return null;
  }

  public static hasSpecialCharacter(control: FormControl): ValidationResult {
    let hasSpecialCharacter = /[!@#$%^&*)(+=_-]/.test(control.value);
    if (!hasSpecialCharacter) {
      // return what´s not valid
      return { hasSpecialCharacter: true };
    }
    return null;
  }

  public static hasLower(control: FormControl): ValidationResult {
    let hasLower = /[a-z]/.test(control.value);
    if (!hasLower) {
      // return what´s not valid
      return { hasLower: true };
    }
    return null;
  }

  public static hasUpper(control: FormControl): ValidationResult {
    let hasUpper = /[A-Z]/.test(control.value);
    if (!hasUpper) {
      // return what´s not valid
      return {hasUpper: true};
    }
    return null;
  }

  public static hasNumber(control: FormControl): ValidationResult {
    let hasNumber = /\d/.test(control.value);
    if (!hasNumber) {
      // return what´s not valid
      return {hasNumber: true};
    }
    return null;
  }

}
