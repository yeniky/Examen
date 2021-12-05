import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { Platform } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  nombreUsuario: string = '';

  constructor(private db: DbService, private router: Router, private platform: Platform, private qr: BarcodeScanner) 
  {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.cerrarSesion();
    });

    this.ruta='assets/icon/FOTO.png';
  }

  ruta: string = '';
  texto: string = '';

  ngOnInit() {
    this.db.obtenerNombre().then(data => {
      this.nombreUsuario = '¡Hola!  ' + data+ ' Un gusto tenerte aqui!';

    })
  }

  async sacarFoto()
  {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      
    });
    this.ruta = image.webPath;
  }

  cerrarSesion() {
    this.db.eliminarUsuario();
    this.router.navigate(['/login'], { replaceUrl: true });
    
  }

  escanerQR(){
    this.qr.scan().then(data => 
    {
      this.texto = data ['text'];
    })
  }
}
