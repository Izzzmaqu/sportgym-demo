/**
 * CONTACT PAGE COMPONENT — SportGym Costa Rica
 * ==============================================
 * Formulario de contacto con validacion reactiva (Angular Reactive Forms).
 * No envia datos reales a ningun servidor — es una fachada visual.
 *
 * Campos del formulario:
 *  - nombre      : texto libre, requerido, min 3 caracteres
 *  - email       : formato email, requerido
 *  - telefono    : formato CR XXXX-XXXX, requerido
 *  - asunto      : texto libre, requerido
 *  - mensaje     : texto largo, requerido, min 20 caracteres
 *  - evaluacion  : radio del 1 al 5 (calificacion del servicio), requerido
 */
import { Component, signal, OnInit, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GYM_INFO } from '../../data/gym.data';

/** Opciones de asunto disponibles en el select */
const ASUNTOS = [
  'Informacion sobre membresias',
  'Consulta sobre horarios',
  'Reservacion de clase',
  'Reclamo o sugerencia',
  'Informacion sobre entrenadores',
  'Otro'
] as const;

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contact.html'
})
export class ContactComponent implements OnInit {

  /** Inyeccion del FormBuilder para construir el formulario de forma fluida */
  private fb = inject(FormBuilder);

  /** Datos del gimnasio para mostrar en la columna lateral del formulario */
  protected gymInfo = GYM_INFO;

  /** Opciones del campo "asunto" */
  protected asuntos = ASUNTOS;

  /** Formulario reactivo principal de la pagina */
  protected form!: FormGroup;

  /**
   * `submitted`: true cuando el usuario envia el formulario con exito.
   * Controla la visibilidad del mensaje de confirmacion.
   */
  protected submitted = signal(false);

  /**
   * `isSubmitting`: true mientras se "procesa" el envio (delay de 1.5s).
   * Evita doble-click y muestra un spinner en el boton.
   */
  protected isSubmitting = signal(false);

  ngOnInit(): void {
    this.buildForm();
  }

  /** Construye el FormGroup con todos los campos y sus validaciones */
  private buildForm(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      email: ['', [Validators.required, Validators.email]],
      // Telefono en formato CR: XXXX-XXXX (8 digitos separados por guion)
      telefono: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}$/)]],
      asunto: ['', Validators.required],
      mensaje: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(600)]],
      // Evaluacion numerica del 1 al 5 (radio buttons)
      evaluacion: ['', Validators.required]
    });
  }

  /**
   * Devuelve un control del formulario por nombre.
   * Helper para simplificar el acceso en el template.
   */
  protected field(name: string) {
    return this.form.get(name)!;
  }

  /**
   * Verifica si un campo debe mostrar su mensaje de error.
   * Solo muestra errores cuando:
   *  - el campo fue tocado (touched), o
   *  - el usuario intento enviar el formulario (submitted flag)
   */
  protected showError(fieldName: string): boolean {
    const control = this.field(fieldName);
    return control.invalid && (control.touched || this.submitted());
  }

  /**
   * Maneja el envio del formulario.
   * Si el formulario es invalido, marca todos los campos como touched para
   * mostrar los errores de validacion al usuario.
   * Si es valido, simula un envio con un delay de 1.5 segundos.
   */
  protected onSubmit(): void {
    // Si el formulario es invalido, marca todos los campos para mostrar errores
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Inicia el estado de "enviando"
    this.isSubmitting.set(true);

    // Simulacion de envio (1.5 segundos de delay artificial)
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitted.set(true);

      // Limpia el formulario despues de un envio exitoso
      this.form.reset();
    }, 1500);
  }

  /** Permite enviar otro mensaje (oculta la confirmacion y muestra el form) */
  protected sendAnother(): void {
    this.submitted.set(false);
    this.buildForm();
  }
}
