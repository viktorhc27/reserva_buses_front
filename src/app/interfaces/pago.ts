export interface Pago {
  id: number;
  monto: number;
  metodoPago: 'EFECTIVO' | 'TARJETA' | 'TRANSFERENCIA'; // según tu ENUM
  estado: 'PAGADO' | 'PENDIENTE' | 'FALLIDO';       // según tu ENUM
  createdAt: string;
  updatedAt: string;
  reserva_id?: number; // si usas ambos campos, aclara su uso
}
