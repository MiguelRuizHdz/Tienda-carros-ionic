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
  categorias: any[] = [];
  porCategoria: any[] = [];

  resultados: any[] = [];


  constructor(private http: HttpClient) {
    this.cargarTodos();
    this.cargarCategorias();
  }

  cargarPorCategoria( categoria: number ) {
    return new Promise( (resolve, reject ) =>{

      this.http.get( `${ URL }/productos/por_tipo/${ categoria }` )
                          .subscribe( (data: any) => {
                            if( data.error ) {
                              // Aquí hay un problema
                              resolve(false);
                            } else {
                              this.porCategoria = data.productos;
                            }
                            resolve(true);
                          });
      });
  }

  cargarTodos() {

    return new Promise( (resolve, reject ) =>{

      this.http.get( `${ URL }/productos/todos/${ this.pagina }` )
                          .subscribe( (data: any) => {
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

  cargarCategorias(){
    return new Promise( (resolve, reject ) =>{

      this.http.get( `${ URL }/lineas` )
                          .subscribe( (data: any) => {
                            if( data.error ) {
                              // Aquí hay un problema
                              resolve(false);
                            } else {
                              this.categorias = data.lineas;
                            }
                            resolve(true);
                          });
    });
  }

  buscarProducto( termino: string ) {

    return this.http.get(`${ URL }/productos/buscar/${ termino }`)
                          .subscribe( (resp: any ) => {
                            this.resultados = resp.productos;
                          });

  }


}
