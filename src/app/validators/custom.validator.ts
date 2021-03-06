import { FormControl } from '@angular/forms';

export class CustomValidator {
    static NegativeNumberValidator(control: FormControl) {
        const value: number = control.value.toString().replace(/[^0-9]/g, '');

        if (value < 0) {
            return {'Número inválido': true};
        }
    }

    static ZipCodeValidator(control: FormControl) {
        const value: string = control.value.toString().replace(/[^0-9]/g, '').slice(0, 8);
        if (value.length !== 8) {
            return {'CEP inválido': true};
        }

        return null;
    }

    static SelectValidator(control: FormControl){
        const value: number = control.value.toString();
        if (value === 0) {
            return {'Selecione uma opção.': true};
        }

        return null;
    }

    static EmailValidator(control: FormControl) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(control.value)){
            return { 'E-mail inválido' : true  };
        }

        return null;
    }
}
