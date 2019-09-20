import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestpagePage } from './restpage.page';

describe('RestpagePage', () => {
  let component: RestpagePage;
  let fixture: ComponentFixture<RestpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestpagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
