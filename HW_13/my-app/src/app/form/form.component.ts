import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataService, Student } from "../data.service";
import { validateDOB } from "./validatorDOB.validator";
import { validateFIO } from "./validatorFIO.validator";

@Component({
    selector: "app-form",
    templateUrl: "./form.component.html",
    styleUrls: ["./form.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
export class FormComponent implements  OnInit, OnChanges{
  @Input() list!: Student[];
  @Input() buttonName!: string;
  @Input() index: number = 0;
  @Input() indexF: boolean = false;
  @Output() hiddenChange = new EventEmitter<boolean>();
  @Output() listChange = new EventEmitter<Student[]>();
  flag: boolean = true;
  submitFlag: boolean = false;

  formAddEdit: FormGroup = this.fb.group({
    birthDate: ["", [Validators.required, validateDOB]],
    averageScore: ["", Validators.required],
    fio: this.fb.group({
      lastName: ["", Validators.required],
      firstName: ["", Validators.required],
      middleName: ["", Validators.required]
  }, { validator: [validateFIO] })
  });

  currDate?: Date;

  constructor(private fb: FormBuilder, private cf: ChangeDetectorRef, private dataService: DataService){

  }

  ngOnInit (): void{
    this.currDate = new Date();
    const  currentDate: Date = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 10);
    this.currDate = currentDate;
  }

  ngOnChanges(changes: SimpleChanges): void{
    if (changes != null){
      console.log(changes);
    }
    if (this.indexF){
      this.edition();
    } else {
      this.formAddEdit.reset();
    }
  }

  edition(): void {
    this.formAddEdit.get("fio")?.get("lastName")?.setValue(this.list[this.index].lastName);
    this.formAddEdit.get("fio")?.get("firstName")?.setValue(this.list[this.index].firstName);
    this.formAddEdit.get("fio")?.get("middleName")?.setValue(this.list[this.index].middleName);
    this.formAddEdit.controls["birthDate"].setValue(this.list[this.index].birthDate);
    this.formAddEdit.controls["averageScore"].setValue(this.list[this.index].averageScore);
  }
  saveEdit(): void {
    this.list[this.index].lastName = this.formAddEdit.get("fio")?.get("lastName")?.value;
    this.list[this.index].firstName = this.formAddEdit.get("fio")?.get("firstName")?.value;
    this.list[this.index].middleName = this.formAddEdit.get("fio")?.get("middleName")?.value;
    this.list[this.index].birthDate = this.formAddEdit.controls["birthDate"].value;
    this.list[this.index].averageScore = this.formAddEdit.controls["averageScore"].value;
    this.hiddenChange.emit(this.flag);

  }

  addRow(): void {
    const stud: Student = {
      lastName:this.formAddEdit.get("fio")?.get("lastName")?.value,
      firstName: this.formAddEdit.get("fio")?.get("firstName")?.value,
      middleName:this.formAddEdit.get("fio")?.get("middleName")?.value,
      birthDate: String(this.formAddEdit.controls["birthDate"].value),
      averageScore: String(this.formAddEdit.controls["averageScore"].value)
    };
    this.dataService.addData(stud);
    this.hiddenChange.emit(this.flag);
  }

  submitButton(): void {
    this.submitFlag = true;
  }

  _onSubmit(): void {
    if (this.buttonName === "Сохранить" && this.submitFlag) {
      this.saveEdit();
      this.formAddEdit.reset();
    } else if (this.buttonName === "Добавить" && this.submitFlag) {
      this.addRow();
      this.formAddEdit.reset();
    }
  }
  closeButton(): void {
    this.submitFlag = false;
    this.hiddenChange.emit(this.flag);
  }


}
