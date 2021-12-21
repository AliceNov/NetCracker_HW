import { Component } from "@angular/core";
import { Student, STUDENTS } from "./students";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public studentList = STUDENTS;

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
  filS: [] = [];
  filterHidden: boolean = true;
  nameButton: string = "";
  hiddenFormFlag: boolean = true;

  formatDate(data: string): Date{
    return new Date(data);
  }

  toggleChecked(event: any): void {
    if (event.target.checked){
          this.turnOn = true;
    } else if (!event.target.checked){
      this.turnOn = false;
    }
  }

  findStudent(value: string): void {
    for (const name of this.studentList){
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

  compare(value: string): boolean{
    if (parseFloat(value) < 3) {
      return true;
    }
    return false;
  }

  sortBy(value: string): void{
      this.sort = value;
      this.orderBy();
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

  filterByDate(): void{
    this.studentList = this.studentList.filter((stud) => {
      const start = new Date(this.fromDate);
      const end = new Date(this.toDate);
      if (new Date(stud.birthDate) > start && new Date(stud.birthDate) < end) {
        return stud;
      }
      return false;
    });
  }

  filterByScore(): void {
    if (!this.fromNum || !this.toNum){
      this.studentList = STUDENTS;
      return;
    }
    this.studentList = this.studentList.filter((stud) => {
      const start = parseFloat(this.fromNum);
      const end = parseFloat(this.toNum);
      if (parseFloat(stud.averageScore) >= start && parseFloat(stud.averageScore) <= end) {
        return stud;
      }
      return false;
      });
  }

  orderBy(): void {
    if (this.sort === "last"){
      this.studentList = this.studentList.sort( (stud1, stud2) => {
          if (stud1.lastName.toLowerCase() < stud2.lastName.toLowerCase()) {
            return -1;
          }
          if (stud1.lastName.toLowerCase() > stud2.lastName.toLowerCase()) {
              return 1;
            }
                return 0;
        });
    }
    if (this.sort === "first"){
      this.studentList = this.studentList.sort( (stud1, stud2) => {
            if (stud1.firstName.toLowerCase() < stud2.firstName.toLowerCase()) {
              return -1;
            }
            if (stud1.firstName.toLowerCase() > stud2.firstName.toLowerCase()) {
                return 1;
              }
                  return 0;
          });
    }
    if (this.sort === "middle"){
      this.studentList = this.studentList.sort( (stud1, stud2) => {
            if (stud1.middleName.toLowerCase() < stud2.middleName.toLowerCase()) {
              return -1;
            }
            if (stud1.middleName.toLowerCase() > stud2.middleName.toLowerCase()) {
                return 1;
              }
                  return 0;
          });
    }
    if (this.sort === "score"){
      this.studentList = this.studentList.sort( (stud1, stud2) => {
            if (parseFloat(stud1.averageScore) < parseFloat(stud2.averageScore)) {
              return -1;
            }
            if (parseFloat(stud1.averageScore) > parseFloat(stud2.averageScore)) {
                return 1;
              }
                  return 0;
          });
    }
    if (this.sort === "date"){
      this.studentList = this.studentList.sort( (stud1, stud2) => {
            if (new Date(stud1.birthDate) < new Date(stud2.birthDate)) {
              return -1;
            }
            if (new Date(stud1.birthDate) > new Date(stud2.birthDate)) {
                return 1;
              }
                  return 0;
          });
    }
  }

  showFilter(): void {
    this.filterHidden = false;
  }

  confirmFilter(flag: boolean): void{
    if (flag) {
      this.studentList = STUDENTS;
      if (this.fromDate && this.toDate){
        this.filterByDate();
      }
      if (this.fromNum && this.toNum) {
        this.filterByScore();
      }
      this.filterHidden = true;
    } else {
      this.filterHidden = true;
      return;
    }
  }

  cleanFilter(): void{
    this.studentList = STUDENTS;
    this.fromDate = "";
    this.toDate = "";
    this.fromNum = "";
    this.toNum = "";
    this.turnOn = false;
  }

  indexNumber: number = 0;
  indexFlag: boolean = false;
  editButton(index: number): void {
    this.nameButton = "Сохранить";
    this.hiddenFormFlag = false;
    this.indexNumber = index;
    this.indexFlag = true;
  }
  addButton(): void{
    this.nameButton = "Добавить";
    this.hiddenFormFlag = false;
  }

  closeButton(flag: boolean): void{
    this.hiddenFormFlag = flag;
  }

  listChange(list: Student[]): void{
    this.studentList = list;
  }
}
