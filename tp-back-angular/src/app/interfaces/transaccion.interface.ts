export interface Transaccion {
  _id?: string;
  monedaOrigen: string;
  cantidadOrigen: number;
  monedaDestino: string;
  cantidadDestino: number;
  tasaConversion: number;
  emailCliente: string;
}
