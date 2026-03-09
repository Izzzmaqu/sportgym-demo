/**
 * NOT FOUND PAGE COMPONENT — SportGym Costa Rica
 * =================================================
 * Pagina 404 personalizada. Se activa cuando el router no encuentra
 * ninguna ruta que coincida con la URL solicitada (ruta wildcard '**').
 * No requiere logica adicional — solo renderiza el template estatico.
 */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.html'
})
export class NotFoundComponent {}
