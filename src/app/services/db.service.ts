import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private sqlite: SQLite, private router: Router) {
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS USUARIO(USER VARCHAR(30), ' +
        'PASS VARCHAR(30))', []).then(() => {
          console.log('Tabla de usuario creada');
        }).catch(e => {
          console.log('Error al crear tabla de usuario');
        })
    }).catch(e => {
      console.log('Error al crear BBDD');
    })
  }

  almacenarUsuario(usuario, contrasena) {
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO USUARIO VALUES(?, ?)', [usuario, contrasena]).then(() => {
        console.log('Usuario almacenado');
      }).catch(e => {
        console.log('Error al almacenar usuario');
      })
    }).catch(e => {
      console.log(' Error al crear BBDD');
    })
  }

  eliminarUsuario() {
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM USUARIO', []).then(() => {
        console.log('Usuario eliminado');
      }).catch(e => {
        console.log('Error al eliminar el usuario');
      })
    }).catch(e => {
      console.log('Error al crear BBDD');
    })
  }

  obtenerCantidadUsuarios() {
    return this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return db.executeSql('SELECT COUNT(USER) AS CANTIDAD FROM USUARIO', []).then((data) => {
        return data.rows.item(0).CANTIDAD;
      }).catch(e => {
        console.log('Error al obtener cantidad de usuario');
        return 99;
      })
    }).catch(e => {
      console.log('Error al crear BBDD');
      return 99;
    })
  }

  obtenerNombre() {
    return this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return db.executeSql('SELECT USER FROM USUARIO', []).then((data) => {
        return data.rows.item(0).USER;
      }).catch(e => {
        console.log('Error al obtener cantidad de usuario');
        return '';
      })
    }).catch(e => {
      console.log('Error al crear BBDD');
      return '';
    })
  }

  canActivate() {
    this.obtenerCantidadUsuarios().then(data => {
      if (data === 1) {
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
    })

    return true;
  }
}
