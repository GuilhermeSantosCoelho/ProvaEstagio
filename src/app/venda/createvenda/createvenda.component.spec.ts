import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatevendaComponent } from './createvenda.component';

describe('CreatevendaComponent', () => {
  let component: CreatevendaComponent;
  let fixture: ComponentFixture<CreatevendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatevendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatevendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
