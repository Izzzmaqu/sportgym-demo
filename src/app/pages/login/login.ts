/**
 * LOGIN PAGE COMPONENT — SportGym Costa Rica
 * =============================================
 * Formulario de inicio de sesion. Fachada de demostración — no autentica
 * usuarios reales. Siempre muestra un mensaje de "credenciales incorrectas"
 * al intentar iniciar sesion, con una nota explicando que es un demo.
 */
import { Component, signal, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html'
})
export class LoginComponent {

  private fb = inject(FormBuilder);

  protected form: FormGroup = this.fb.group({
    usuario: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  /** Controla la visibilidad del campo de contrasena */
  protected showPassword = signal(false);

  /** Mensaje de error de login que se muestra debajo del formulario */
  protected loginError = signal('');

  /** Estado de carga durante la simulacion de autenticacion */
  protected isLoading = signal(false);

  /** Acceso rapido a un control del formulario */
  protected field(name: string) {
    return this.form.get(name)!;
  }

  /** Determina si un campo debe mostrar su error */
  protected showError(fieldName: string): boolean {
    const control = this.field(fieldName);
    return control.invalid && control.touched;
  }

  /**
   * Maneja el intento de login.
   * Despues del timeout de "procesamiento", siempre devuelve un error
   * de credenciales invalidas (comportamiento esperado en demo sin backend).
   */
  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loginError.set('');
    this.isLoading.set(true);

    // Simulacion del tiempo de respuesta de un servidor real (~1 segundo)
    setTimeout(() => {
      this.isLoading.set(false);
      // Fachada: siempre falla el login porque no hay backend
      this.loginError.set(
        'Usuario o contraseña incorrectos. Este es un sitio de demostración — no existe un sistema de autenticación real.'
      );
    }, 1000);
  }
}
