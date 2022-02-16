import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  pagina = 0;
  productos: any[] = [];

  constructor(private http: HttpClient) {
    this.cargarTodos();
  }

  cargarTodos() {

    return new Promise( (resolve, reject ) =>{

      this.http.get( `${ URL }/productos/todos/${ this.pagina }` )
                          .subscribe( (data: any) => {
                            console.log(data);
                            if( data.error ) {
                              // Aquí hay un problema
                              resolve(false);
                            } else {
                              this.productos.push( ...data.productos );
                              this.pagina += 1;
                            }
                            resolve(true);
                          });
    });

  }


}
