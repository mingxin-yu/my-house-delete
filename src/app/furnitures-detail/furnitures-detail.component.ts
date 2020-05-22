import { Component, OnInit, Input} from '@angular/core';
import { Furniture } from '../furniture';

import { FurnitureService } from '../furniture.service';

@Component({
  selector: 'app-furnitures-detail',
  templateUrl: './furnitures-detail.component.html',
  styleUrls: ['./furnitures-detail.component.css']
})

export class FurnituresDetailComponent implements OnInit {

  @Input() furniture: Furniture;

  constructor( private furnitureService: FurnitureService,) { }

  ngOnInit(): void {
  }

  save(): void {
    this.furnitureService.updateFurniture(this.furniture).subscribe();
  }

}
