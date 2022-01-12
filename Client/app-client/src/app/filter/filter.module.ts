import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterPopComponent } from "./filter-pop/filter-pop.component";
import { FormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    FilterPopComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [FilterPopComponent]
})
export class FilterModule { }
