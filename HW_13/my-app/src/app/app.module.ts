import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { FilterPipe } from "./filter.pipe";
import { FilterScorePipe } from "./filterScore.pipe";
import { SortByPipe } from "./sortBy.pipe";

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    FilterScorePipe,
    SortByPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
