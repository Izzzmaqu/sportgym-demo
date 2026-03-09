import { Component, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GYM_IDENTITY, GYM_INFO } from '../../data/gym.data';

/*
  ABOUT COMPONENT — Pagina "Acerca de"
  =====================================
  Muestra la identidad corporativa del gimnasio:

  SECCIONES:
  1. Hero de la pagina (imagen de fondo + titulo)
  2. Historia del gimnasio (texto narrativo)
  3. Mision y Vision (dos columnas)
  4. Valores corporativos (grid de tarjetas)
  5. Equipo humano (fotos y roles)

  No tiene estado interactivo complejo, solo:
  - Datos importados de gym.data.ts
  - Intersection Observer para animaciones al scroll (igual que Home)
*/
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.html',
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  // Datos de identidad corporativa importados del archivo central
  protected readonly identity = GYM_IDENTITY;
  protected readonly gymInfo = GYM_INFO;

  private intersectionObserver?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy(): void {
    this.intersectionObserver?.disconnect();
  }

  /*
    Mismo patron de IntersectionObserver que en HomeComponent.
    Factorizado aqui para mantener la consistencia de animaciones
    en todo el sitio sin depender de un servicio compartido
    (no es necesario para un proyecto de esta escala).
  */
  private setupIntersectionObserver(): void {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.intersectionObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      this.intersectionObserver?.observe(el);
    });
  }
}
