import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeparturesDrawerComponent } from './create-departures-drawer.component';

describe('CreateDeparturesDrawerComponent', () => {
  let component: CreateDeparturesDrawerComponent;
  let fixture: ComponentFixture<CreateDeparturesDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDeparturesDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDeparturesDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
