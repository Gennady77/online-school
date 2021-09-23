import { AbstractControl, Validators } from "@angular/forms";

export class AppValidators {
  static required(msg = 'Поле обязательно для заполнения') {
    return (control: AbstractControl) => {
      return Validators.required(control) ? { required: {message: msg} } : null;
    }
  }

  static numeric(message = 'Вводить можно только цифры') {
    return (control: AbstractControl) => {
      return  !/^[\d]*$/.test(control.value) ? {numeric: {message}} : null;
    }
  }
}
