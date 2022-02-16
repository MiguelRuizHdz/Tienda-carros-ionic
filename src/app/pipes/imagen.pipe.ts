import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const URL_IMAGENES = environment.urlImagenes;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(codigo: string) {
    return URL_IMAGENES + codigo + '.jpg';
  }

}
