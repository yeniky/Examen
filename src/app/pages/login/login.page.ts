import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_usuario: string = '';
  mdl_contrasena: string = '';

  constructor(private alertController: AlertController,
    private api: ApiService,
    private toastController: ToastController,
    private router: Router,
    private db: DbService) { }

  ngOnInit() {
    this.db.obtenerCantidadUsuarios().then(data => {
      if (data === 1) {
        this.router.navigate(['principal']);
      }
    })
  }

  async presentarFormularioIngreso() {
    const alert = await this.alertController.create({
      header: 'Nuevo Usuario',
      inputs: [
        {
          name: 'txt_usuario',
          type: 'text',
          placeholder: 'Ingrese Usuario'
        },
        {
          name: 'txt_contrasena',
          type: 'password',
          placeholder: 'Ingrese Contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Almacenar',
          handler: (data) => {
            this.api.crearUsuario(data.txt_usuario, data.txt_contrasena).subscribe(data => {
              console.log(data)});


          }
        }
      ]
    });

    await alert.present();
  }

  crearUsuario(usuario, contrasena) {
    this.api.crearUsuario(usuario, contrasena).subscribe(data => {
      this.mostrarRespuesta(data['result']);
    });
  }

  async mostrarRespuesta(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  login() {
    this.api.login(this.mdl_usuario, this.mdl_contrasena).subscribe(data => {
      if (data['result'] === 'LOGIN NOK') {
        this.db.eliminarUsuario();
        this.mostrarRespuesta("Credenciales incorrectas");
      } else {
        this.db.eliminarUsuario();
        this.db.almacenarUsuario(this.mdl_usuario, this.mdl_contrasena);
        this.router.navigate(['principal'], { replaceUrl: true });
      }

    })
  }

  navegar() {
    this.router.navigate(['contrasena']);
  }


}
