import { Component } from "@angular/core";
import students from "../students.json";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public studentList: { lastName: string, firstName: string, middleName: string, birthDate: string, averageScore: number }[] = students;

  formatDate(data: string): Date{
    return new Date(data);
  }

  turnOn: boolean = false;
  nameSearch: string = "";
  search: boolean = false;
  fromDate: string = "";
  toDate: string = "";
  fromNum: string = "";
  toNum: string = "";
  sort: string = "";
  hidd: boolean = true;
  confirm: boolean = true;
  indexDelete: number = 0;

  toggleChecked(event: any): void {
    if (event.target.checked){
          this.turnOn = true;
    } else if (!event.target.checked){
      this.turnOn = false;
    }
  }

  findStudent(value: string): void {
    for (const name of students){
      const fio1 = name.lastName + " " + name.firstName;
      const fio2 = name.firstName + " " + name.lastName;

      if (value === name.firstName || value === name.lastName){
        this.nameSearch = value;
        this.search = true;
        return;
      }
      if (value === fio1 || value === fio2){
        this.nameSearch = value;
        this.search = true;
        return;
      }
      if (!value){
        this.search = false;
        return;
      }
    }
  }

  highlightSearch(firstName: string, lastName: string): boolean {
    const fio1 = lastName + " " + firstName;
    const fio2 = firstName + " " + lastName;

    if (firstName === this.nameSearch || lastName === this.nameSearch){
      return true;
    }
    if (fio1 === this.nameSearch || fio2 === this.nameSearch){
      return true;
    }
    return false;
  }

  clean(): void{
    this.search = false;
  }

  sortBy(value: string): void{
      this.sort = value;
  }
  confirmDialog(flag: boolean): void{
    if (flag) {
      this.deleteRow(this.indexDelete);
      this.hidd = true;
    } else {
      this.hidd = true;
      return;
    }
  }

  deleteButton(index: number): void{
    this.hidd = false;
    this.indexDelete = index;
  }

  deleteRow(index: number): void{
    this.studentList.splice(index, 1);
  }
}
