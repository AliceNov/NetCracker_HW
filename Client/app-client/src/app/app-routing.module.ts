import {  NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormComponent } from "./components/form/form.component";
import { NotFoundCompComponent } from "./components/not-found-comp/not-found-comp.component";
import { TableComponent } from "./components/table/table.component";
import { EditGuard } from "./edit.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/students",
    pathMatch: "full"
  },
  {
    path:"students",
    pathMatch: "full",
    component: TableComponent
  },
  {
    path: "students/create",
    pathMatch: "full",
    component: FormComponent
  },
  {
    path: "students/edit/:id",
    pathMatch: "full",
    component: FormComponent,
    canActivate: [EditGuard]
  },
  {
    path: "**",
    component: NotFoundCompComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
