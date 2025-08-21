export interface Reserva {
  id: number;
  estado: 'PENDIENTE' | 'CONFIRMADA' | 'PENDIENTE'; // según tu ENUM
  createdAt: string;
  updatedAt: string;
  usuario_id: number;
  horario_id: number;
  asientos_id: number;
}
