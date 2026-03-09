/**
 * REGISTER PAGE COMPONENT — SportGym Costa Rica
 * ================================================
 * Formulario de registro de nuevo miembro. Fachada de demostración —
 * no crea cuentas reales ni persiste datos.
 *
 * Validaciones implementadas:
 *  - identificacion : 9 digitos exactos (cedula CR)
 *  - usuario        : requerido, min 4, max 20 chars, solo alfanumerico + guion bajo
 *  - password       : requerido, min 8 chars, debe contener al menos una letra y un numero
 *  - confirmPassword: debe coincidir con password (validador personalizado a nivel de grupo)
 *  - nombre         : requerido, min 2 chars
 *  - primerApellido : requerido, min 2 chars
 *  - segundoApellido: opcional
 *  - email          : requerido, formato email
 *  - telefono       : requerido, formato CR XXXX-XXXX
 *  - plan           : requerido, radio buttons con los planes disponibles
 *  - terminosYCond  : checkbox requerido (debe estar marcado)
 */
import { Component, signal, OnInit, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MEMBERSHIP_PLANS } from '../../data/gym.data';

/**
 * Validador personalizado a nivel de GRUPO del formulario.
 * Verifica que "password" y "confirmPassword" sean iguales.
 * Se aplica al FormGroup completo, no a un control individual.
 *
 * @param group - el FormGroup padre que contiene ambos campos
 * @returns ValidationErrors si no coinciden, null si coinciden
 */
function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value as string | null;
  const confirm = group.get('confirmPassword')?.value as string | null;

  // Solo validamos si ambos campos tienen valor
  if (!password || !confirm) return null;

  return password === confirm ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html'
})
export class RegisterComponent implements OnInit {

  private fb = inject(FormBuilder);

  /** Planes de membresia disponibles para mostrar en los radio buttons */
  protected plans = MEMBERSHIP_PLANS;

  /** Estado del formulario */
  protected form!: FormGroup;

  /** Controla la visibilidad de la contrasena en el input */
  protected showPassword = signal(false);
  protected showConfirmPassword = signal(false);

  /** Controla si el usuario completo el registro exitosamente */
  protected submitted = signal(false);

  /** Simula el procesamiento del formulario */
  protected isSubmitting = signal(false);

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group(
      {
        identificacion: [
          '',
          [
            Validators.required,
            // Cedula costarricense: exactamente 9 digitos numericos
            Validators.pattern(/^\d{9}$/)
          ]
        ],
        nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
        primerApellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
        segundoApellido: ['', Validators.maxLength(60)], // Opcional
        email: ['', [Validators.required, Validators.email]],
        telefono: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}$/)]],
        usuario: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
            // Solo letras, numeros y guion bajo — sin espacios ni caracteres especiales
            Validators.pattern(/^[a-zA-Z0-9_]+$/)
          ]
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            // La contrasena debe tener al menos una letra y un numero
            Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/)
          ]
        ],
        confirmPassword: ['', Validators.required],
        plan: ['Basico', Validators.required],
        terminosYCond: [false, Validators.requiredTrue] // Checkbox: debe ser true
      },
      {
        // El validador de coincidencia de contrasena se aplica al grupo entero
        validators: passwordMatchValidator
      }
    );
  }

  /** Acceso rapido a un control del formulario */
  protected field(name: string) {
    return this.form.get(name)!;
  }

  /** Determina si debe mostrar el error de un campo */
  protected showError(fieldName: string): boolean {
    const control = this.field(fieldName);
    return control.invalid && (control.touched || this.isSubmitting());
  }

  /** Verifica si las contrasenas no coinciden (error a nivel de grupo) */
  protected get passwordMismatch(): boolean {
    return (
      this.form.hasError('passwordMismatch') &&
      (this.field('confirmPassword').touched || this.isSubmitting())
    );
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    // Fachada: en una app real aqui iria la llamada al servicio de autenticacion
    console.log('Registro fachada:', this.form.value);

    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitted.set(true);
    }, 1800);
  }
}
