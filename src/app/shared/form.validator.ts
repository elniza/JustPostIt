import {FormControl, FormGroup} from '@angular/forms';

export interface ValidationResult {
  [key: string]: boolean;
}

export class FormValidator {

  //checks controller's value not equals to the forbidden init value
  public static initValueChanged(controllerNames: string[], initValues: string[]) {
    return (group: FormGroup): ValidationResult => {
      for (let i = 0; i < controllerNames.length; i++) {
        const currentController = group.get(controllerNames[i]);
        const currentInitValue = initValues[i];
        if (currentController.value != currentInitValue) {
          // return what´s not valid
          return null;
        }
      }
      return {initValueChanged: true};
    }
  }

//checks controller's value starts with a letter
  public static startsWithLetter(control: FormControl): ValidationResult {
    let startsWithLetter = /^[a-zA-Z]/.test(control.value);
    if (!startsWithLetter) {
      // return what´s not valid
      return {startsWithLetter: true};
    }
    return null;
  }

  //checks controller's value has at least one special character
  public static hasSpecialCharacter(control: FormControl): ValidationResult {
    let hasSpecialCharacter = /[!@#$%^&*)(+=_-]/.test(control.value);
    if (!hasSpecialCharacter) {
      // return what´s not valid
      return {hasSpecialCharacter: true};
    }
    return null;
  }

//checks controller's value has at least one lower case character
  public static hasLower(control: FormControl): ValidationResult {
    let hasLower = /[a-z]/.test(control.value);
    if (!hasLower) {
      // return what´s not valid
      return {hasLower: true};
    }
    return null;
  }

  //checks controller's value has at least one upper case character
  public static hasUpper(control: FormControl): ValidationResult {
    let hasUpper = /[A-Z]/.test(control.value);
    if (!hasUpper) {
      // return what´s not valid
      return {hasUpper: true};
    }
    return null;
  }

//checks controller's value has at least one number
  public static hasNumber(control: FormControl): ValidationResult {
    let hasNumber = /\d/.test(control.value);
    if (!hasNumber) {
      // return what´s not valid
      return {hasNumber: true};
    }
    return null;
  }

}
