import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RequestStatus } from '../../shared/types/request-status.type';
import { ConvertRequest } from '../../interfaces/convert-request.interface';
import { ConversionDivisas } from '../../services/conversion-divisas.service';
import { TransaccionService } from '../../services/transaccion.service';
import { Transaccion } from '../../interfaces/transaccion.interface';

@Component({
  selector: 'app-formulario-conversion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-conversion.component.html',
  styleUrl: './formulario-conversion.component.css',
})
export class FormularioConversionComponent {
  conversionForm: FormGroup = this.fb.group({
    from: ['', [Validators.required]],
    to: ['', [Validators.required]],
    amount: ['', [Validators.required]],
  });

  status: RequestStatus = 'no status';
  resultadoConversion = 0;

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

  constructor(
    private fb: FormBuilder,
    private convesionDivisasService: ConversionDivisas,
    private transaccionesService: TransaccionService
  ) {}

  get from(): FormControl {
    return this.conversionForm.get('from') as FormControl;
  }

  get to(): FormControl {
    return this.conversionForm.get('to') as FormControl;
  }

  get amount(): FormControl {
    return this.conversionForm.get('amount') as FormControl;
  }

  onSubmit(): void {
    if (this.conversionForm.invalid) {
      this.conversionForm.markAllAsTouched();
      return;
    }

    const conversion: ConvertRequest = this.conversionForm
      .value as ConvertRequest;

    this.convertir(conversion);
  }

  convertir(conversion: ConvertRequest): void {
    this.status = 'pending';
    this.convesionDivisasService.convert(conversion).subscribe({
      next: (response) => {
        this.status = 'success';
        this.resultadoConversion = response;
        /* TODO: De donde saco esto? email, tasa conversión */
        const transaccion: Transaccion = {
          monedaOrigen: conversion.from,
          cantidadOrigen: Number.parseInt(conversion.amount),
          monedaDestino: conversion.to,
          cantidadDestino: response,
          emailCliente: 'ejemplo@email.com',
          tasaConversion: 0.99,
        };
        this.guardarTransaccion(transaccion);
      },
      error: (error) => {
        this.status = 'error';
        console.error(error);
        this.resultadoConversion = 0;
      },
    });
  }

  guardarTransaccion(transaccion: Transaccion): void {
    this.transaccionesService.create(transaccion).subscribe({
      next: () => {
        console.log('Transacción guardada');
      },
      error: (error) => {
        console.error('Error al guardar la transacción', error);
      },
    });
  }
}
