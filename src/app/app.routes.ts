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
    path: '',
    title: 'SportGym Costa Rica | Inicio',
    data: { description: 'SportGym Costa Rica — Tu gimnasio en Barrio Escalante, San José. Zonas de pesas, cardio, CrossFit y bienestar. Instructores certificados y reservaciones en línea.' },
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'acerca-de',
    title: 'Acerca de Nosotros | SportGym Costa Rica',
    data: { description: 'Conocé la historia, misión y valores de SportGym Costa Rica. Más de 10 años formando atletas en Barrio Escalante, San José.' },
    loadComponent: () =>
      import('./pages/about/about').then((m) => m.AboutComponent),
  },
  {
    path: 'servicios',
    title: 'Servicios y Zonas de Entrenamiento | SportGym Costa Rica',
    data: { description: 'Explorá todas las zonas de entrenamiento de SportGym: cardio, pesas libres, CrossFit, yoga y más. Planes desde ₡25,000/mes.' },
    loadComponent: () =>
      import('./pages/services/services').then((m) => m.ServicesComponent),
  },
  {
    path: 'mapa',
    title: 'Ubicación | SportGym Costa Rica',
    data: { description: 'SportGym Costa Rica está ubicado 150 metros norte del Parque España, Barrio Escalante, San José. Fácil acceso en transporte público.' },
    loadComponent: () =>
      import('./pages/map/map').then((m) => m.MapComponent),
  },
  {
    path: 'contacto',
    title: 'Contáctenos | SportGym Costa Rica',
    data: { description: 'Contactá a SportGym Costa Rica por teléfono, WhatsApp o correo. Estamos en Barrio Escalante, San José. Respondemos en menos de 24 horas.' },
    loadComponent: () =>
      import('./pages/contact/contact').then((m) => m.ContactComponent),
  },
  {
    path: 'registro',
    title: 'Crear Cuenta | SportGym Costa Rica',
    data: { description: 'Creá tu cuenta en SportGym Costa Rica y comenzá tu transformación hoy. Acceso a reservaciones, seguimiento de progreso y beneficios exclusivos.' },
    loadComponent: () =>
      import('./pages/register/register').then((m) => m.RegisterComponent),
  },
  {
    path: 'login',
    title: 'Iniciar Sesión | SportGym Costa Rica',
    data: { description: 'Iniciá sesión en tu cuenta de SportGym Costa Rica para gestionar tus reservaciones y ver tu progreso de entrenamiento.' },
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
