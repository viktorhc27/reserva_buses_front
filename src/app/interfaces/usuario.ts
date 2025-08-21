export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  passwordHash: string;
  rol: 'admin' | 'cliente' | 'chofer'; // ajusta según tus ENUM reales
  telefono: string;
  createdAt: string;
  updatedAt: string;
}
