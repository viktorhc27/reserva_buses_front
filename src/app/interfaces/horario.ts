import { Bus } from "./bus";
import { Ruta } from "./ruta";

export interface Horario {
  id: number;
  fechaSalida: string;      // formato 'YYYY-MM-DD'
  horaSalida: string;       // formato 'HH:mm:ss'
  estado: 'ACTIVO' | 'CANCELADO' // ajusta según tus valores ENUM
  createdAt: string;        // formato ISO
  updatedAt: string;        // formato ISO
  bus_id?: number;          // si es distinto de busId, aclara en tu modelo
  ruta_id?: number;
  usuario_id?: number;
  ruta?: Ruta; // Relación opcional con Ruta
  bus?: Bus;
}


export interface HorarioListResponse {
  horarios: (Horario & { ruta: Ruta })[];
}
