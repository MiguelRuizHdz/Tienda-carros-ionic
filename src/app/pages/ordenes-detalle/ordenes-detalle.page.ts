import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ordenes-detalle',
  templateUrl: './ordenes-detalle.page.html',
  styleUrls: ['./ordenes-detalle.page.scss'],
})
export class OrdenesDetallePage implements OnInit {

  orden = {};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.snapshot.paramMap.keys.forEach((key) => {
      this.orden[key] = this.route.snapshot.paramMap.get(key);
    });
    console.log(this.orden);
  }

}
