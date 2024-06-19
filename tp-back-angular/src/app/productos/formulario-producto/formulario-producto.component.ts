import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto.interface';
import { RequestStatus } from '../../shared/types/request-status.type';

@Component({
  selector: 'app-formulario-producto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-producto.component.html',
  styleUrl: './formulario-producto.component.css',
})
export class FormularioProductoComponent {
  productoForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    imagen: ['', [Validators.required]],
    precio: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(1)]],
    destacado: [false, [Validators.required]],
  });

  status: RequestStatus = 'no status';

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService
  ) {}

  get nombre(): FormControl {
    return this.productoForm.get('nombre') as FormControl;
  }

  get descripcion(): FormControl {
    return this.productoForm.get('descripcion') as FormControl;
  }

  get imagen(): FormControl {
    return this.productoForm.get('imagen') as FormControl;
  }

  get precio(): FormControl {
    return this.productoForm.get('precio') as FormControl;
  }

  get stock(): FormControl {
    return this.productoForm.get('stock') as FormControl;
  }

  get destacado(): FormControl {
    return this.productoForm.get('destacado') as FormControl;
  }

  onSubmit(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    const producto: Producto = this.productoForm.value;
    this.crearProducto(producto);
  }

  crearProducto(producto: Producto): void {
    this.productoService.createProducto(producto).subscribe({
      next: () => {
        this.status = 'success';
      },
      error: () => {
        this.status = 'error';
      },
    });
  }
}
