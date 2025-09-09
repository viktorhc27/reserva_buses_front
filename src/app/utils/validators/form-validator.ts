import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador de RUT chileno para FormControl.
 * Retorna { rutInvalido: true } si el RUT no es válido, o null si es válido.
 */
export function rutValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const rut = control.value;
    if (!rut) return null; // Si está vacío, no valida aquí (puedes combinar con Validators.required)

    const limpio = rut.replace(/\./g, '').replace('-', '');
    if (limpio.length < 2) return { rutInvalido: true };

    const cuerpo = limpio.slice(0, -1);
    const dv = limpio.slice(-1).toUpperCase();

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const dvEsperado = 11 - (suma % 11);
    const dvFinal = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

    return dv === dvFinal ? null : { rutInvalido: true };
  };
}
