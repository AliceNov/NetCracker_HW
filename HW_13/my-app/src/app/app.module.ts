import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FormComponent } from "./form/form.component";
import { FilterModuleModule } from "./filter-module/filter-module.module";
import { HighlightDirective } from "./highlighting.directive";
import { SortImgDirective } from "./sort-img.directive";
import { SearchPipe } from "./search.pipe";
import { UppercasePipe } from "./uppercase.pipe";

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HighlightDirective,
    SearchPipe,
    SortImgDirective,
    UppercasePipe,
  ],
  imports: [
    BrowserModule,
    FilterModuleModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
