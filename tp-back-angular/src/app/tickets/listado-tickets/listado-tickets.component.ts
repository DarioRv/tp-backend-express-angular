import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../interfaces/ticket.interface';
import { TicketService } from '../../services/ticket.service';
import { CategoriaPipe } from '../pipes/categoria.pipe';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listado-tickets',
  standalone: true,
  imports: [CategoriaPipe],
  templateUrl: './listado-tickets.component.html',
  styleUrl: './listado-tickets.component.css',
})
export class ListadoTicketsComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(
    private ticketsService: TicketService,
    private router: Router,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(params?: any): void {
    this.ticketsService.getAll(params).subscribe({
      next: (tickets) => (this.tickets = tickets),
      error: (err) => console.error(err),
    });
  }

  editTicket(id: string): void {
    this.router.navigate(['formulario-ticket', id]);
  }

  deleteTicket(id: string): void {
    this.ticketsService.deleteById(id).subscribe({
      next: () => {
        this.getTickets();
        this.toastService.success('Ticket eliminado correctamente');
      },
      error: (err) => {
        console.error(err);
        this.toastService.error('Error al eliminar el ticket');
      },
    });
  }
}
