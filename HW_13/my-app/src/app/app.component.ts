import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { STUDENTS } from "./students";
import { validateDOB } from "./validatorDOB.validator";
import { validateFIO } from "./validatorFIO.validator";

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
  nameButton: string = "сохранить";
  hiddenFormFlag: boolean = true;
  submitFlag: boolean = false;
  formAddEdit: any;

  constructor(private fb: FormBuilder){
    this.formAddEdit = this.fb.group({
      birthDate: ["", [Validators.required, validateDOB]],
      averageScore: ["", Validators.required],
      fio: this.fb.group({
        lastName: ["", Validators.required],
        firstName: ["", Validators.required],
        middleName: ["", Validators.required]
    }, { validator: [validateFIO] })
    });
  }

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
  editButton(index: number): void {
    this.nameButton = "Сохранить";
    this.hiddenFormFlag = false;
    this.formAddEdit.get("fio")?.get("lastName")?.setValue(this.studentList[index].lastName);
    this.formAddEdit.get("fio")?.get("firstName")?.setValue(this.studentList[index].firstName);
    this.formAddEdit.get("fio")?.get("middleName")?.setValue(this.studentList[index].middleName);
    this.formAddEdit.controls["birthDate"].setValue(this.studentList[index].birthDate);
    this.formAddEdit.controls["averageScore"].setValue(this.studentList[index].averageScore);
    this.indexNumber = index;
  }

  saveEdit(): void{
    this.studentList[this.indexNumber].lastName = this.formAddEdit.get("fio")?.get("lastName")?.value;
    this.studentList[this.indexNumber].firstName = this.formAddEdit.get("fio")?.get("firstName")?.value;
    this.studentList[this.indexNumber].middleName = this.formAddEdit.get("fio")?.get("middleName")?.value;
    this.studentList[this.indexNumber].birthDate = this.formAddEdit.controls["birthDate"].value;
    this.studentList[this.indexNumber].averageScore = this.formAddEdit.controls["averageScore"].value;
    this.formAddEdit.reset();
    this.hiddenFormFlag = true;
  }

  addButton(): void{
    this.nameButton = "Добавить";
    this.hiddenFormFlag = false;
  }

  addRow(): void{
    this.studentList.push({
        lastName:this.formAddEdit.get("fio")?.get("lastName")?.value,
        firstName: this.formAddEdit.get("fio")?.get("firstName")?.value,
        middleName:this.formAddEdit.get("fio")?.get("middleName")?.value,
        birthDate: String(this.formAddEdit.controls["birthDate"].value),
        averageScore: String(this.formAddEdit.controls["averageScore"].value)

    });
    this.formAddEdit.reset();
    this.hiddenFormFlag = true;
  }

  closeButton(): void{
    this.submitFlag = false;
    this.formAddEdit.reset();
    this.hiddenFormFlag = true;
  }

  submitButton(): void{
    this.submitFlag = true;
  }
  _onSubmit(): void{
    if (this.nameButton === "Сохранить" && this.submitFlag) {
      this.saveEdit();
    } else if (this.nameButton === "Добавить" && this.submitFlag) {
      this.addRow();
    }
  }
}
