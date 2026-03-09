import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';

/*
  CONFIGURACION DE LA APLICACION ANGULAR
  =======================================
  ApplicationConfig es la forma moderna (Angular 17+) de configurar
  los proveedores globales sin necesidad de NgModule.

  Cada funcion provide* o with* agrega capacidades especificas:
*/
export const appConfig: ApplicationConfig = {
  providers: [
    /*
      provideBrowserGlobalErrorListeners: Registra listeners globales
      para errores no capturados en el navegador, util para debugging.
    */
    provideBrowserGlobalErrorListeners(),

    /*
      provideRouter: Configura el sistema de enrutamiento con las rutas
      definidas en app.routes.ts y las siguientes opciones:

      - withComponentInputBinding(): Permite que los parametros de la URL
        (query params, route params) se bindeen automaticamente como
        @Input() en los componentes, sin necesidad de ActivatedRoute.

      - withInMemoryScrolling(): Controla el comportamiento del scroll
        al navegar entre rutas:
        * scrollPositionRestoration: 'enabled' -> al ir atras/adelante
          restaura la posicion del scroll donde el usuario estaba.
        * anchorScrolling: 'enabled' -> permite navegar a secciones
          especificas de la pagina via fragmentos (#seccion).

      - withViewTransitions(): Habilita la View Transitions API del navegador
        para transiciones suaves entre rutas (fade nativo del browser).
        Solo funciona en Chrome/Edge modernos; en otros navegadores
        funciona normalmente sin transicion, sin errores.
    */
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withViewTransitions()
    ),
  ],
};
