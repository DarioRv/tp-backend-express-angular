import { Component, OnInit } from '@angular/core';
import { Transaccion } from '../../interfaces/transaccion.interface';
import { TransaccionService } from '../../services/transaccion.service';
import { RequestStatus } from '../../shared/types/request-status.type';
import { CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listado-trasacciones',
  standalone: true,
  imports: [CurrencyPipe, RouterModule],
  templateUrl: './listado-trasacciones.component.html',
  styleUrl: './listado-trasacciones.component.css',
})
export class ListadoTrasaccionesComponent implements OnInit {
  transacciones: Transaccion[] = [];
  status: RequestStatus = 'no status';

  currencies = [
    {
      value: 'USD',
      label: 'Dólar estadounidense',
    },
    {
      value: 'EUR',
      label: 'Euro',
    },
    {
      value: 'JPY',
      label: 'Yen japonés',
    },
    {
      value: 'CAD',
      label: 'Dólar canadiense',
    },
    {
      value: 'BRL',
      label: 'Real brasileño',
    },
    {
      value: 'ARS',
      label: 'Peso argentino',
    },
    {
      value: 'COP',
      label: 'Peso colombiano',
    },
    {
      value: 'MXN',
      label: 'Peso mexicano',
    },
    {
      value: 'PEN',
      label: 'Sol peruano',
    },
  ];

  constructor(private transaccionesService: TransaccionService) {}

  ngOnInit(): void {
    this.getTransacciones();
  }

  getTransacciones(options?: any): void {
    this.transaccionesService.getTransacciones(options).subscribe({
      next: (transacciones) => {
        this.transacciones = transacciones;
        this.status = 'success';
      },
      error: (error) => {
        console.error(error);
        this.status = 'error';
      },
    });
  }
}
