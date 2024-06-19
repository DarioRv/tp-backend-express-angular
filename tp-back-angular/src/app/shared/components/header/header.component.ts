import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeedService } from '../../../services/seed.service';
import { ToastrService } from 'ngx-toastr';

interface MenuItem {
  label: string;
  routerLink: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuItems: MenuItem[] = [
    { label: 'Productos', routerLink: 'productos' },
    { label: 'Formulario Producto', routerLink: 'formulario-producto' },
    { label: 'Formulario Transacción', routerLink: 'formulario-transaccion' },
    { label: 'Transacciones', routerLink: 'transacciones' },
    { label: 'Tickets', routerLink: 'tickets' },
    { label: 'Formulario Ticket', routerLink: 'formulario-ticket' },
  ];

  constructor(
    private seedService: SeedService,
    private toastService: ToastrService
  ) {}

  seed(): void {
    this.seedService.seed().subscribe({
      next: () => this.toastService.info('Base de datos rellenada'),
      error: (err) => console.error(err),
    });
  }

  clean(): void {
    this.seedService.clean().subscribe({
      next: () => this.toastService.info('Base de datos limpiada'),
      error: (err) => console.error(err),
    });
  }
}
