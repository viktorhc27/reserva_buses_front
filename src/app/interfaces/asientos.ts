export interface Asientos {
  id: number;
  numero: number;
  estado: 'disponible' | 'ocupado' | 'reservado' | 'fuera_servicio';
  bus_id?: number;
  horario_id:number;
}
