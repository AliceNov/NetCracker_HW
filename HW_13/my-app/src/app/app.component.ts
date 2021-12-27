import { Component, DoCheck, KeyValueDiffer, KeyValueDiffers } from "@angular/core";
import { DataService, Student } from "./data.service";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [DataService]
})
export class AppComponent implements DoCheck{
  public studentList = this.dataService.getData();
  clearList: Student [] = this.studentList;
  it: Student[] = [];
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
  filterHidden: boolean = this.dataService.getFilterFalg();
  nameButton: string = "";
  hiddenFormFlag: boolean = true;

  differ: KeyValueDiffer<any, any>;
  constructor(private dataService: DataService, private keyValueDiffers: KeyValueDiffers){
    this.differ = this.keyValueDiffers.find(this.dataService).create();
  }


  ngDoCheck(): void {
    if (this.differ.diff(this.dataService) != null ){
        this.filterHidden = this.dataService.getFilterFalg();
        this.studentList = this.dataService.getData();
    }
  }

  formatDate(data: string): Date{
    return new Date(data);
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
  inS: string = "";
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

  deleteRow(index: number): void {
    this.dataService.deleteData(index);
  }

  sortBy(value: string): void{
    this.sort = value;
    this.orderBy();
}
  imgSortLast: string = "down";
  imgSortFirst: string = "down";
  imgSortMid: string = "down";
  imgSortDate: string = "down";
  imgSortScore: string = "down";
  orderBy(): void {
    if (this.sort === "last"){
        if (this.imgSortLast === "down") {
          this.imgSortLast = "up";
          this.orderByDown();
        } else if (this.imgSortLast === "up") {
          this.imgSortLast = "down";
          this.orderByUp();
        }

    }
    if (this.sort === "first"){
      if (this.imgSortFirst === "down") {
        this.imgSortFirst = "up";
        this.orderByDown();
      } else if (this.imgSortFirst === "up") {
        this.imgSortFirst = "down";
        this.orderByUp();
      }

    }
    if (this.sort === "middle"){
      if (this.imgSortMid === "down") {
        this.imgSortMid = "up";
        this.orderByDown();
      } else if (this.imgSortMid === "up") {
        this.imgSortMid = "down";
        this.orderByUp();
      }

    }
    if (this.sort === "score"){
      if (this.imgSortScore === "down") {
        this.imgSortScore = "up";
        this.orderByDown();
      } else if (this.imgSortScore === "up") {
        this.imgSortScore = "down";
        this.orderByUp();
      }

    }
    if (this.sort === "date"){
      if (this.imgSortDate === "down") {
        this.imgSortDate = "up";
        this.orderByDown();
      } else if (this.imgSortDate === "up") {
        this.imgSortDate = "down";
        this.orderByUp();
      }

    }
  }

  orderByDown(): void{
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

  orderByUp(): void{
    if (this.sort === "last"){
      this.studentList = this.studentList.sort( (stud1, stud2) => {
          if (stud1.lastName.toLowerCase() > stud2.lastName.toLowerCase()) {
            return -1;
          }
          if (stud1.lastName.toLowerCase() < stud2.lastName.toLowerCase()) {
              return 1;
            }
                return 0;
        });
    }
    if (this.sort === "first"){
      this.studentList = this.studentList.sort( (stud1, stud2) => {
            if (stud1.firstName.toLowerCase() > stud2.firstName.toLowerCase()) {
              return -1;
            }
            if (stud1.firstName.toLowerCase() < stud2.firstName.toLowerCase()) {
                return 1;
              }
                  return 0;
          });
    }
    if (this.sort === "middle"){
      this.studentList = this.studentList.sort( (stud1, stud2) => {
            if (stud1.middleName.toLowerCase() > stud2.middleName.toLowerCase()) {
              return -1;
            }
            if (stud1.middleName.toLowerCase() < stud2.middleName.toLowerCase()) {
                return 1;
              }
                  return 0;
          });
    }
    if (this.sort === "score"){
      this.studentList = this.studentList.sort( (stud1, stud2) => {
            if (parseFloat(stud1.averageScore) > parseFloat(stud2.averageScore)) {
              return -1;
            }
            if (parseFloat(stud1.averageScore) < parseFloat(stud2.averageScore)) {
                return 1;
              }
                  return 0;
          });
    }
    if (this.sort === "date"){
      this.studentList = this.studentList.sort( (stud1, stud2) => {
            if (new Date(stud1.birthDate) > new Date(stud2.birthDate)) {
              return -1;
            }
            if (new Date(stud1.birthDate) < new Date(stud2.birthDate)) {
                return 1;
              }
                  return 0;
          });
    }
  }

  showFilter(): void {
    this.filterHidden = this.dataService.setFilterFlag(false);
  }



  cleanFilter(): void{
    this.studentList = this.clearList;
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
    this.indexFlag = false;
  }

  closeButton(flag: boolean): void{
    this.hiddenFormFlag = flag;
  }

  listChange(list: Student[]): void{
    this.studentList = list;
  }
}
