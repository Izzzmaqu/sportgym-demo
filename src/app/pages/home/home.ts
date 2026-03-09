import {
  Component,
  signal,
  computed,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  GYM_INFO,
  SLIDER_IMAGES,
  TESTIMONIALS,
  TRAINING_ZONES,
  type SliderImage,
  type Testimonial,
  type TrainingZone,
} from '../../data/gym.data';

/*
  HOME COMPONENT
  ==============
  Pagina principal del sitio SportGym.

  SECCIONES:
  1. Hero Slider: Banner principal con imagenes de las zonas del gimnasio
  2. Stats: Cifras destacadas del gimnasio (atletas, instructores, etc.)
  3. Services Preview: Vista previa de 3 zonas de entrenamiento
  4. Testimonials: Opiniones de atletas del gimnasio
  5. Social Media: Links a redes sociales del gimnasio
  6. CTA Final: Llamada a la accion para registrarse

  SLIDER TECNICO:
  El slider es implementado de forma nativa sin librerias externas:

  - currentSlide: signal<number> con el indice de la imagen activa (0, 1, 2, 3)
  - El avance automatico usa setInterval (nativo del browser)
  - El setInterval se limpia en ngOnDestroy para evitar memory leaks
  - Al hacer hover sobre el slider se pausa el auto-avance
  - Navegacion con flechas y dots

  INTERSECTION OBSERVER:
  Para las animaciones de entrada al viewport, usamos IntersectionObserver
  (API nativa del browser). Cuando un elemento con clase 'animate-on-scroll'
  entra al 20% del viewport, le agregamos la clase 'is-visible' que activa
  la animacion fadeInUp definida en styles.css.

  La referencia a los elementos observables se obtiene con @ViewChildren
  y QueryList de Angular.
*/
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  /*
    isPlatformBrowser: Necesario para verificar que estamos en el navegador
    antes de usar APIs especificas del browser (setInterval, IntersectionObserver).
    Aunque esta es una app puramente cliente, es buena practica para
    compatibilidad con SSR (Server Side Rendering) si se agrega en el futuro.
  */
  private readonly platformId = inject(PLATFORM_ID);

  // ============================================================
  // DATOS DEL SLIDER
  // ============================================================
  protected readonly slides = SLIDER_IMAGES;
  protected readonly gymInfo = GYM_INFO;
  protected readonly testimonials = TESTIMONIALS;
  protected readonly stats = GYM_INFO.stats;

  /*
    Tomamos solo las 3 zonas marcadas como "featured: true" en gym.data.ts
    para el preview. El metodo filter retorna un nuevo array, no modifica el original.
    Array spread [...] porque TRAINING_ZONES es readonly (as const) y filter
    retorna un array mutable compatible.
  */
  protected readonly featuredZones = [...TRAINING_ZONES].filter((z) => z.featured);

  // ============================================================
  // ESTADO DEL SLIDER
  // ============================================================

  /*
    currentSlideIndex: Indice de la imagen actualmente visible (0-based).
    Usamos signal() para que Angular detecte cambios eficientemente.
  */
  protected readonly currentSlideIndex = signal(0);

  /*
    isPaused: Cuando el usuario hace hover sobre el slider, pausamos el
    avance automatico. Se cancela al salir, es una mejor UX.
  */
  private isSliderPaused = false;

  /*
    Referencia al intervalo del auto-avance.
    Guardamos la referencia para poder cancelarlo en ngOnDestroy.
    Si no se cancela, el setInterval sigue ejecutandose aunque el
    componente ya no exista, causando memory leak y potenciales errores.
  */
  private sliderInterval?: ReturnType<typeof setInterval>;

  /*
    INTERSECTION OBSERVER para animaciones al scroll.
    Se guarda la referencia para desconectarlo en ngOnDestroy.
  */
  private intersectionObserver?: IntersectionObserver;

  // ============================================================
  // LIFEHOOKS DE ANGULAR
  // ============================================================

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Iniciar el auto-avance del slider cuando el componente se carga
      this.startSliderAutoPlay();
    }
  }

  ngAfterViewInit(): void {
    /*
      ngAfterViewInit: Se ejecuta despues de que Angular renderiza el template.
      En este punto ya tenemos acceso al DOM, por eso configuramos el
      IntersectionObserver aqui y no en ngOnInit.
    */
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy(): void {
    /*
      LIMPIEZA DE RECURSOS:
      Siempre limpiar timers, intervals y observers cuando el
      componente se destruye para evitar memory leaks.
    */
    this.stopSliderAutoPlay();
    this.intersectionObserver?.disconnect();
  }

  // ============================================================
  // METODOS DEL SLIDER
  // ============================================================

  /*
    startSliderAutoPlay: Inicia el avance automatico cada 5 segundos.
    5000ms es un buen balance: suficiente tiempo para ver la imagen
    pero sin ser demasiado lento.
  */
  private startSliderAutoPlay(): void {
    this.sliderInterval = setInterval(() => {
      if (!this.isSliderPaused) {
        this.nextSlide();
      }
    }, 5000);
  }

  private stopSliderAutoPlay(): void {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
    }
  }

  /*
    goToSlide: Navega a un slide especifico por indice.
    Usado por los dots de navegacion.
  */
  goToSlide(index: number): void {
    this.currentSlideIndex.set(index);
  }

  /*
    nextSlide: Avanza al siguiente slide.
    El modulo (%) hace que despues del ultimo vuelva al primero.
    Ej: si hay 4 slides: (3 + 1) % 4 = 0 -> vuelve al inicio.
  */
  nextSlide(): void {
    this.currentSlideIndex.update((i) => (i + 1) % this.slides.length);
  }

  /*
    prevSlide: Retrocede al slide anterior.
    (i - 1 + length) % length evita indices negativos.
    Ej: (0 - 1 + 4) % 4 = 3 -> el ultimo slide.
  */
  prevSlide(): void {
    this.currentSlideIndex.update(
      (i) => (i - 1 + this.slides.length) % this.slides.length
    );
  }

  /*
    pauseSlider / resumeSlider: Para el hover.
    El usuario merece poder leer el contenido del slide sin que cambie.
  */
  pauseSlider(): void {
    this.isSliderPaused = true;
  }

  resumeSlider(): void {
    this.isSliderPaused = false;
  }

  // ============================================================
  // INTERSECTION OBSERVER PARA ANIMACIONES
  // ============================================================

  /*
    setupIntersectionObserver:
    Configura el observador de visibilidad para elements con clase 'animate-on-scroll'.

    IntersectionObserver es mas eficiente que el evento 'scroll':
    - No bloquea el hilo principal
    - El browser lo optimiza automaticamente
    - No requiere calcular posiciones manualmente

    threshold: 0.12 -> El elemento necesita estar 12% visible para activar.
    Esto asegura que la animacion no se active antes de que el usuario
    realmente vea el elemento.
  */
  private setupIntersectionObserver(): void {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // El elemento es visible: agregamos la clase para iniciar la animacion
            entry.target.classList.add('is-visible');
            /*
              Una vez que el elemento ya se animo, dejamos de observarlo.
              Esto mejora el rendimiento porque el browser no necesita
              seguir rastreando ese elemento.
            */
            this.intersectionObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    /*
      Seleccionamos todos los elementos con clase 'animate-on-scroll'
      dentro de este componente y los registramos para observacion.
    */
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => this.intersectionObserver?.observe(el));
  }
}
