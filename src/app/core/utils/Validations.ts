import { FormGroup, Validators } from "@angular/forms";
import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";
import * as moment from "moment";
export function MonthValdation(monthValue: string) {
  return (formGroup: FormGroup) => {
    let month: any = formGroup.controls[monthValue];
    if (month.errors && !month.errors.month) {
      return;
    }
    if (
      month.value !== null &&
      month.value.toString().length > 0 &&
      month.value > 11
    ) {
      month.setErrors({ month: true });
    } else {
      month.setErrors(null);
    }
  };
}
export function noWhitespaceValidator(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      if (control.errors && !control.errors["noWhitespaceValidator"]) {
        return;
      }
      const isWhitespace = (control.value || "").trim().length === 0;
      const isValid = !isWhitespace;
      return isValid || control.value === null || control.value === ""
        ? control.setErrors(null)
        : control.setErrors({ noWhitespaceValidator: true });
    };
  }
export class RegexConstants {
  public static Text_Area = ".*\\S.*[a-zA-z].*[a-zA-z0-9](.*?|\n)*?";
}

export function TextRegexValidator(reg: RegexConstants): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlValue = (control.value || "").trim();
    if (controlValue && !controlValue.toString().match(reg)) {
      return { isValid: true };
    }
    if (controlValue && controlValue.length === 0) {
      return { isValid: true };
    }
    return null;
  };
}
