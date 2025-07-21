import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prodects } from './prodects';

describe('Prodects', () => {
  let component: Prodects;
  let fixture: ComponentFixture<Prodects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Prodects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Prodects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
