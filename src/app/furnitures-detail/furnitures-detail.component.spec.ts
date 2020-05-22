import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnituresDetailComponent } from './furnitures-detail.component';

describe('FurnituresDetailComponent', () => {
  let component: FurnituresDetailComponent;
  let fixture: ComponentFixture<FurnituresDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FurnituresDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FurnituresDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
