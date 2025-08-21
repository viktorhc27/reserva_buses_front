export interface Bus {
  id?: number;
  patente: string;
  modelo: string;
  capacidad: number;
  estado: 'ACTIVO' | 'INACTIVO';
}
