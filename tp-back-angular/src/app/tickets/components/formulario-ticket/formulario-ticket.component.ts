import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';
import { RequestStatus } from '../../../shared/types/request-status.type';
import { Ticket } from '../../../interfaces/ticket.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario-ticket',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-ticket.component.html',
  styleUrl: './formulario-ticket.component.css',
})
export class FormularioTicketComponent implements OnInit {
  ticketForm = this.fb.group({
    _id: [''],
    espectador: ['', Validators.required],
    categoriaEspectador: ['', Validators.required],
    precio: [0, Validators.required],
  });
  status: RequestStatus = 'no status';

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private ticketsService: TicketService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      if (!id) return;
      this.getTicket(id);
    });
  }

  get espectador(): FormControl {
    return this.ticketForm.get('espectador') as FormControl;
  }

  get categoriaEspectador(): FormControl {
    return this.ticketForm.get('categoriaEspectador') as FormControl;
  }

  get precio(): FormControl {
    return this.ticketForm.get('precio') as FormControl;
  }

  onSubmit(): void {
    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }

    const ticket = this.ticketForm.value as Ticket;
    ticket._id ? this.updateTicket(ticket) : this.createTicket(ticket);
  }

  createTicket(ticket: Ticket): void {
    this.status = 'pending';

    this.ticketsService.create(ticket).subscribe({
      next: () => {
        this.status = 'success';
        this.ticketForm.reset();
        this.toastService.success('Ticket creado correctamente');
      },
      error: (err) => {
        console.error(err);
        this.status = 'error';
        this.toastService.error('Error al crear el ticket');
      },
    });
  }

  updateTicket(ticket: Ticket): void {
    this.status = 'pending';

    this.ticketsService.update(ticket).subscribe({
      next: () => {
        this.status = 'success';
        this.toastService.success('Ticket actualizado correctamente');
      },
      error: (err) => {
        console.error(err);
        this.status = 'error';
        this.toastService.error('Error al actualizar el ticket');
      },
    });
  }

  getTicket(id: string): void {
    this.ticketsService.getById(id).subscribe({
      next: (ticket) => {
        this.ticketForm.reset(ticket);
        this.toastService.info('Editando ticket');
      },
      error: (err) => {
        console.error(err);
        this.toastService.error('Error al obtener el ticket');
      },
    });
  }
}
