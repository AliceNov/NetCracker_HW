import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HighlightDirective } from "./directives/highlighting.directive";
import { SortImgDirective } from "./directives/sort-img.directive";

import { SearchPipe } from "./pipes/search.pipe";
import { UppercasePipe } from "./pipes/uppercase.pipe";
import { TableComponent } from "./components/table/table.component";
import { FormComponent } from "./components/form/form.component";
import { DeleteComponent } from "./components/delete/delete.component";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { FilterModule } from "./filter/filter.module";
import { EditGuard } from "./edit.guard";
import { NotFoundCompComponent } from "./components/not-found-comp/not-found-comp.component";
import { serverLocalProvider } from "./config.token";


@NgModule({
  declarations: [
    AppComponent,
    DeleteComponent,
    FormComponent,
    HighlightDirective,
    NotFoundCompComponent,
    SearchPipe,
    SortImgDirective,
    TableComponent,
    UppercasePipe,

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FilterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    EditGuard,
    serverLocalProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
