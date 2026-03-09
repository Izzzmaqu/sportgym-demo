import { Component, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GYM_INFO } from '../../data/gym.data';

/*
  MAP COMPONENT — Pagina de Ubicacion
  =====================================
  Muestra la ubicacion fisica del gimnasio con un mapa embebido de OpenStreetMap.

  SEGURIDAD — DomSanitizer:
  Angular, por seguridad, bloquea URLs de iframes por defecto para prevenir
  ataques XSS (Cross-Site Scripting). Si ponemos una URL directamente en
  [src] de un <iframe>, Angular la bloquea con un error de seguridad.

  DomSanitizer.bypassSecurityTrustResourceUrl() le dice a Angular:
  "Esta URL es de confianza, no la bloquees".

  IMPORTANTE: Esto es seguro SOLO porque la URL viene de gym.data.ts
  (una constante del codigo, no de input del usuario).
  NUNCA uses bypassSecurityTrustResourceUrl con URLs que vengan de
  formularios o parametros de URL, eso si seria una vulnerabilidad XSS.

  OpenStreetMap vs Google Maps:
  - OpenStreetMap: Gratuito, sin API key, buena precision
  - Google Maps: Requiere API key de pago, mejor interfaz
  Para un proyecto academico/demostracion, OpenStreetMap es ideal.
*/
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.html',
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly gymInfo = GYM_INFO;

  /*
    safeMapUrl: URL del iframe de OpenStreetMap sanitizada.
    Se computa una vez al construir el componente (no es una propiedad
    computada porque DomSanitizer ya maneja el caching internamente).

    La URL viene de GYM_INFO.address.mapEmbedUrl definida en gym.data.ts,
    que apunta a las coordenadas de Barrio Escalante, San Jose, Costa Rica.
  */
  protected readonly safeMapUrl: SafeResourceUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl(
      GYM_INFO.address.mapEmbedUrl
    );

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
      { threshold: 0.12 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      this.intersectionObserver!.observe(el);
    });
  }
}
