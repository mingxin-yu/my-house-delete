import { Component, OnInit } from '@angular/core';
import { Furniture } from '../furniture';
import { FurnitureService } from '../furniture.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-furnitures',
  templateUrl: './furnitures.component.html',
  styleUrls: ['./furnitures.component.css']
})

export class FurnituresComponent implements OnInit {

  selectedFurniture: Furniture;

  furnitures: Furniture[];

  constructor(private furnitureService: FurnitureService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getFurnitures();
  }

  onSelect(furniture: Furniture): void {
    this.selectedFurniture = furniture;
    this.messageService.add(`FurnitureService: Selected furniture id=${furniture.id}`);
  }

  getFurnitures(): void {
    this.furnitureService.getFurnitures()
      .subscribe(furnitures => this.furnitures = furnitures);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.furnitureService.addFurniture({ name } as Furniture)
      .subscribe(furniture => {
        this.furnitures.push(furniture);
      });
  }

  delete(furniture: Furniture): void {
    this.furnitures = this.furnitures.filter(h => h !== furniture);
    this.furnitureService.deleteFurniture(furniture).subscribe();
  }

}


