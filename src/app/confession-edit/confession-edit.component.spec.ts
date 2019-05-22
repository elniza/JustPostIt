import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfessionEditComponent } from './confession-edit.component';

describe('ConfessionEditComponent', () => {
  let component: ConfessionEditComponent;
  let fixture: ComponentFixture<ConfessionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfessionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfessionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
