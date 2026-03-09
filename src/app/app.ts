import { Component, OnInit, inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar';
import { FooterComponent } from './core/footer/footer';
import { WhatsappButtonComponent } from './core/whatsapp-button/whatsapp-button';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, WhatsappButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) route = route.firstChild;
        return route.snapshot.data['description'];
      })
    ).subscribe((description: string | undefined) => {
      if (description) {
        this.meta.updateTag({ name: 'description', content: description });
      }
    });
  }
}
