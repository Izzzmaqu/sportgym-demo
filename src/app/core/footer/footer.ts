import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GYM_INFO } from '../../data/gym.data';

/*
  FOOTER COMPONENT
  =================
  Pie de pagina global del sitio SportGym.

  CONTENIDO:
  1. Columna del gimnasio: logo, nombre, descripcion corta, redes sociales
  2. Columna de navegacion rapida: links a las paginas del sitio
  3. Columna de contacto: telefono, email, direccion, horarios
  4. Barra inferior: copyright con ano dinamico, credits legales

  DECISION: El footer tiene 3 columnas en desktop (grid-cols-3)
  que se convierten en 1 columna en mobile para mejor legibilidad.

  El ano del copyright se genera dinamicamente con `new Date().getFullYear()`
  para que no haya que actualizarlo manualmente cada ano.
*/
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
})
export class FooterComponent {
  /*
    Datos del gimnasio importados del archivo centralizado de datos.
    Al usar el archivo central, si el email o telefono cambia,
    solo se actualiza gym.data.ts y automaticamente se actualiza
    en el footer, la pagina de contacto y donde sea que se use.
  */
  protected readonly gymInfo = GYM_INFO;

  /*
    Ano actual para el copyright.
    Se calcula una vez al crear el componente (no cambia en runtime).
    getFullYear() retorna el ano de 4 digitos (ej: 2026).
  */
  protected readonly currentYear = new Date().getFullYear();

  /*
    Links de navegacion rapida para el footer.
    Son los mismos del navbar mas el link al menu de registro.
  */
  protected readonly quickLinks = [
    { path: '/',           label: 'Inicio'        },
    { path: '/acerca-de',  label: 'Acerca de'     },
    { path: '/servicios',  label: 'Servicios'     },
    { path: '/mapa',       label: 'Ubicación'     },
    { path: '/contacto',   label: 'Contáctenos'   },
    { path: '/registro',   label: 'Crear cuenta'  },
  ];
}
