import { Component, signal } from '@angular/core';
import { GYM_INFO } from '../../data/gym.data';

/*
  WHATSAPP BUTTON COMPONENT
  ==========================
  Boton flotante de WhatsApp visible en todas las paginas del sitio.

  FUNCIONAMIENTO:
  - Posicion fija en la esquina inferior derecha (fixed bottom-6 right-6)
  - Al hacer clic abre WhatsApp con el numero del gimnasio
  - Muestra un tooltip "¡Escríbenos!" al hacer hover
  - Anillo de pulso animado para llamar la atencion sutilmente
  - Se oculta/muestra con fade segun el scroll (para no molestar
    al inicio cuando el navbar es visible)

  SEGURIDAD:
  - El link usa wa.me que es el dominio oficial de WhatsApp para deep links
  - rel="noopener noreferrer" previene ataques de tabnapping
    (la nueva pestaña no puede acceder al window.opener)
  - El numero se toma de gym.data.ts (no hardcodeado en el template)

  ACCESIBILIDAD:
  - aria-label descriptivo en el boton
  - El tooltip es puramente visual; la informacion completa esta en aria-label
  - El anillo de pulso tiene aria-hidden="true"

  ANIMACION:
  - pulseRing: @keyframes definido en styles.css
    Genera el efecto de "onda expansiva" alrededor del boton.
    Solo aparece si prefers-reduced-motion no esta activo.
*/
@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [],
  templateUrl: './whatsapp-button.html',
})
export class WhatsappButtonComponent {
  /*
    URL de WhatsApp Web / App.
    wa.me es el dominio oficial de Meta para deep links de WhatsApp.
    El formato es: https://wa.me/{numero_en_formato_internacional_sin_+_ni_espacios}
    El numero de Costa Rica tiene codigo de pais 506.

    El mensaje pre-llenado es opcional pero mejora la conversion:
    el usuario ya ve un mensaje listo para enviar, lo que reduce la
    friccion de iniciar la conversacion.
  */
  protected readonly whatsappUrl =
    `https://wa.me/${GYM_INFO.contact.whatsapp}?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20SportGym.`;

  /*
    Numero formateado para mostrar en el tooltip.
  */
  protected readonly phoneDisplay = GYM_INFO.contact.whatsappDisplay;

  /*
    Estado del hover del tooltip.
    Aunque el tooltip se puede hacer con CSS puro (:hover),
    usamos signal para mayor control (animacion, accesibilidad).
  */
  protected readonly tooltipVisible = signal(false);

  showTooltip(): void {
    this.tooltipVisible.set(true);
  }

  hideTooltip(): void {
    this.tooltipVisible.set(false);
  }
}
