import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FilterPopComponent } from "./filter-pop.component";

describe("FilterPopComponent", () => {
  let component: FilterPopComponent;
  let fixture: ComponentFixture<FilterPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterPopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
