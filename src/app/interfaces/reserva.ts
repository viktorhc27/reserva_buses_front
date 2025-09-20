import { Asientos } from "./asientos";

export interface Reserva {
  id: number;
  estado: 'PENDIENTE' | 'CONFIRMADA' | 'PENDIENTE'; // según tu ENUM
  createdAt: string;
  updatedAt: string;
  usuario_id: number;
  horario_id: number;
  asientos_id: number;
}


export interface PreReserva {
  asientos_id: number;
  horario_id: number;
  cliente_id?: number | null;
  bus_id?: number;
  asiento: Asientos;
  ruta_id:number;
}
