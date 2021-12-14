import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  rutaBase: string = 'http://fer-sepulveda.cl/api/api-prueba2.php';

  constructor(private http: HttpClient) { }

  crearUsuario(usuario, contrasena) {
    return this.http.post(this.rutaBase, { nombreFuncion: 'UsuarioAlmacenar', parametros: [usuario, contrasena] });
  }

  login(usuario, contrasena) {
    return this.http.get(this.rutaBase + '?nombreFuncion=UsuarioLogin&usuario=' + usuario + "&contrasena=" + contrasena);
  }

  modificarContrasena(usuario, contrasena) {
    return this.http.put(this.rutaBase, { nombreFuncion: "UsuarioModificarContrasena", parametros: { usuario: usuario, contrasena: contrasena } });
  }


}
