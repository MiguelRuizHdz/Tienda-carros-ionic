import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordenes-detalle',
  templateUrl: './ordenes-detalle.page.html',
  styleUrls: ['./ordenes-detalle.page.scss'],
})
export class OrdenesDetallePage implements OnInit {

  orden = {};

  constructor(private router: Router) {}

  ngOnInit() {
    this.orden = this.router.getCurrentNavigation().extras.queryParams;
  }

}
