import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-por-categorias',
  templateUrl: './por-categorias.page.html',
  styleUrls: ['./por-categorias.page.scss'],
})
export class PorCategoriasPage implements OnInit {

  categoria = {};

  constructor( private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.snapshot.paramMap.keys.forEach((key) => {
      this.categoria[key] = this.route.snapshot.paramMap.get(key);
    });
    console.log(this.categoria);
  }

}
