export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rut:string;
  passwordHash: string;
  rol: 'admin' | 'cliente' | 'chofer'; // ajusta según tus ENUM reales
  telefono: string;
  createdAt: string;
  updatedAt: string;
}

export interface Clientes {
  id?: number;
  rut:string;
  nombre: string;
  apellidos: string;
  password?:string;
  email: string;
  telefono: string;
  createdAt: string;
  updatedAt: string;
}
