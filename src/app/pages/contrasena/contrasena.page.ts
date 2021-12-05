import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage implements OnInit {

  mdl_usuario: string = '';
  mdl_contrasenaActual: string = '';
  mdl_contrasenaNueva: string = '';

  constructor(private api: ApiService, private router: Router, private toastController: ToastController, private db: DbService) { }

  ngOnInit() {
  }

  modificarContrasena() {

    this.api.login(this.mdl_usuario, this.mdl_contrasenaActual).subscribe(data => {
      if (data['result'] === 'LOGIN OK') {
        this.api.modificarContrasena(this.mdl_usuario, this.mdl_contrasenaNueva).subscribe(data => {
          this.db.eliminarUsuario();
          this.router.navigate(['login']);
        })
      } else {
        this.mostrarRespuesta('Debe ingresar las credenciales correctas');
      }
    })

  }

  async mostrarRespuesta(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

}
