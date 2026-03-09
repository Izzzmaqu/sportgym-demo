import { Component, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TRAINING_ZONES, MEMBERSHIP_PLANS, GYM_INFO } from '../../data/gym.data';

/*
  SERVICES COMPONENT — Pagina de Servicios
  ==========================================
  Muestra todas las zonas de entrenamiento disponibles en el gimnasio
  y los planes de membresia.

  SECCIONES:
  1. Hero de la pagina
  2. Grid de todas las zonas (6 zonas)
  3. Planes de membresia (3 planes)
  4. CTA para registro

  DECISION: Se muestran TODAS las zonas (no solo las featured),
  a diferencia del Home que solo muestra 3. Esta es la pagina
  dedicada a servicios, por lo que debe ser completa.
*/
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services.html',
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  // Array spread [...] para convertir el readonly tuple a un array mutable
  protected readonly zones = [...TRAINING_ZONES];
  protected readonly plans = [...MEMBERSHIP_PLANS];
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
      { threshold: 0.08 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      this.intersectionObserver?.observe(el);
    });
  }
}
