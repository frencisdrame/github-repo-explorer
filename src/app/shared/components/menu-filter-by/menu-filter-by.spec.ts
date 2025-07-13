import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFilterBy } from './menu-filter-by';

describe('MenuFilterBy', () => {
  let component: MenuFilterBy;
  let fixture: ComponentFixture<MenuFilterBy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuFilterBy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuFilterBy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
