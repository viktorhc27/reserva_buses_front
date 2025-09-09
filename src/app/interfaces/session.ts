export interface UsuarioLogin {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

export interface LoginResponse {
  response: 'success' | 'error';
  token?: string;
  usuario?: UsuarioLogin;
  msg?: string;
}

export interface IsLoggedResponse {
  logged: boolean;
  usuario?: UsuarioLogin;
}
