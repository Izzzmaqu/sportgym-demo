import { Routes } from '@angular/router';

/*
  DEFINICION DE RUTAS — SportGym
  ==============================
  Usamos loadComponent() para LAZY LOADING en cada ruta.

  Lazy loading significa que Angular solo descarga el codigo
  de una pagina cuando el usuario navega hacia ella, no al inicio.
  Esto mejora el tiempo de carga inicial del sitio (performance).

  Cada ruta tiene una propiedad `title` que Angular usa para
  actualizar el <title> del navegador automaticamente al navegar.
  Esto es importante para:
  1. SEO: cada pagina tiene un titulo unico en Google
  2. Accesibilidad: los lectores de pantalla anuncian el cambio de pagina

  El separador " | SportGym" al final es una convencion comun
  para identificar el sitio en los resultados de busqueda.
*/
export const routes: Routes = [
  {
    /*
      RUTA RAIZ ("/"): Pagina principal del sitio.
      pathMatch: 'full' es necesario para que '' solo coincida
      exactamente con la URL raiz y no con cualquier URL.
    */
    path: '',
    title: 'SportGym Costa Rica | Inicio',
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.HomeComponent),
  },
  {
    /* ACERCA DE: Historia, mision, vision y valores del gimnasio */
    path: 'acerca-de',
    title: 'Acerca de Nosotros | SportGym Costa Rica',
    loadComponent: () =>
      import('./pages/about/about').then((m) => m.AboutComponent),
  },
  {
    /* SERVICIOS: Zonas de entrenamiento disponibles */
    path: 'servicios',
    title: 'Servicios y Zonas de Entrenamiento | SportGym Costa Rica',
    loadComponent: () =>
      import('./pages/services/services').then((m) => m.ServicesComponent),
  },
  {
    /* MAPA: Ubicacion del gimnasio con iframe de OpenStreetMap */
    path: 'mapa',
    title: 'Ubicacion | SportGym Costa Rica',
    loadComponent: () =>
      import('./pages/map/map').then((m) => m.MapComponent),
  },
  {
    /* CONTACTO: Formulario de contacto con validacion */
    path: 'contacto',
    title: 'Contactenos | SportGym Costa Rica',
    loadComponent: () =>
      import('./pages/contact/contact').then((m) => m.ContactComponent),
  },
  {
    /* REGISTRO: Formulario de registro de atleta (fachada sin backend) */
    path: 'registro',
    title: 'Crear Cuenta | SportGym Costa Rica',
    loadComponent: () =>
      import('./pages/register/register').then((m) => m.RegisterComponent),
  },
  {
    /* LOGIN: Formulario de inicio de sesion (fachada sin backend) */
    path: 'login',
    title: 'Iniciar Sesion | SportGym Costa Rica',
    loadComponent: () =>
      import('./pages/login/login').then((m) => m.LoginComponent),
  },
  {
    /*
      RUTA WILDCARD (**): Captura cualquier URL que no coincida
      con las rutas anteriores y muestra la pagina 404.
      IMPORTANTE: Esta ruta SIEMPRE debe ir al final del array,
      porque Angular evalua las rutas en orden y usaria el
      wildcard antes de llegar a las rutas especificas.
    */
    path: '**',
    title: 'Pagina no encontrada | SportGym Costa Rica',
    loadComponent: () =>
      import('./pages/not-found/not-found').then((m) => m.NotFoundComponent),
  },
];
