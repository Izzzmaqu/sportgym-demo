import { Component, signal, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GYM_INFO } from '../../data/gym.data';

/*
  NAVBAR COMPONENT
  =================
  Barra de navegacion principal del sitio.

  RESPONSABILIDADES:
  1. Mostrar el logo y nombre del gimnasio con link a la pagina principal
  2. Links de navegacion para desktop (horizontal)
  3. Menu hamburguesa para mobile (drawer vertical con animacion)
  4. Botones de CTA: "Registrarse" e "Iniciar Sesion"
  5. Efecto de fondo al hacer scroll (navbar se vuelve solido)
  6. Skip-to-content link para accesibilidad (WCAG 2.4.1)
  7. Cerrar el menu mobile al hacer click en un link

  DECISIONES TECNICAS:
  - Usamos signal() de Angular para el estado del menu mobile.
    signal() es la forma moderna de Angular 17+ para estado local
    reactivo. Es mas eficiente que una variable normal porque
    Angular solo re-renderiza cuando el valor cambia.

  - HostListener para escuchar scroll del documento y agregar
    clases CSS al navbar (fondo solido al bajar de la pagina).

  - RouterLinkActive para marcar el link activo con aria-current="page"
    y estilos visuales, necesario para que los usuarios y lectores de
    pantalla sepan en que pagina estan.

  standalone: true -> No necesita NgModule.
  changeDetection: se hereda de la aplicacion (OnPush seria ideal,
  pero para este proyecto standalone no es critico).
*/
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  /*
    Referencia a la info del gimnasio para usar en el template
    (nombre, links sociales, etc.)
  */
  protected readonly gymInfo = GYM_INFO;

  /*
    signal<boolean>: Estado del menu mobile (abierto/cerrado).
    false = cerrado (estado inicial).
    Al usar signal(), cuando cambia Angular actualiza SOLO las
    partes del template que lo leen, no todo el componente.
  */
  protected readonly mobileMenuOpen = signal(false);

  /*
    signal<boolean>: Indica si el usuario ha hecho scroll.
    Se usa para cambiar el estilo del navbar (transparente -> solido).
  */
  protected readonly isScrolled = signal(false);

  /*
    Links de navegacion definidos como datos, no hardcodeados en HTML.
    Esto hace el componente mas mantenible: para agregar/quitar una ruta
    solo se modifica este array, no el template.
  */
  protected readonly navLinks = [
    { path: '/',          label: 'Inicio',       exact: true  },
    { path: '/acerca-de', label: 'Acerca de',    exact: false },
    { path: '/servicios', label: 'Servicios',    exact: false },
    { path: '/mapa',      label: 'Ubicación',    exact: false },
    { path: '/contacto',  label: 'Contáctenos',  exact: false },
  ];

  /*
    HostListener('window:scroll'): Angular escucha el evento scroll
    del documento. Cuando el usuario baja mas de 20px, activamos
    isScrolled para cambiar el estilo del navbar.

    Separamos la logica de presentacion (CSS) de la logica de negocio
    usando signals: el template solo lee isScrolled() y aplica clases.
  */
  @HostListener('window:scroll')
  onWindowScroll(): void {
    // window.scrollY es la posicion vertical del scroll en pixeles
    this.isScrolled.set(window.scrollY > 20);
  }

  /*
    toggleMobileMenu: Alterna el estado del menu mobile.
    Si estaba abierto lo cierra, si estaba cerrado lo abre.
    update() aplica una funcion al valor actual del signal.
  */
  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  /*
    closeMobileMenu: Cierra el menu mobile.
    Se llama cuando el usuario hace click en un link del menu
    para que el menu se cierre al navegar a la nueva pagina.
  */
  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
