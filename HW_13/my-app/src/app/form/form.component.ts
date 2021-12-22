import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter, OnInit } from "@angular/core";
import { Student } from "../students";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { validateDOB } from "./validatorDOB.validator";
import { validateFIO } from "./validatorFIO.validator";

@Component({
    selector: "app-form",
    templateUrl: "./form.component.html",
    styleUrls: ["./form.component.css"]
  })
export class FormComponent implements OnChanges, OnInit{
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

  constructor(private fb: FormBuilder){

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
    this.formAddEdit.reset();
    this.hiddenChange.emit(this.flag);
    this.listChange.emit(this.list);
  }

  addRow(): void {
    this.list.push({
      lastName:this.formAddEdit.get("fio")?.get("lastName")?.value,
      firstName: this.formAddEdit.get("fio")?.get("firstName")?.value,
      middleName:this.formAddEdit.get("fio")?.get("middleName")?.value,
      birthDate: String(this.formAddEdit.controls["birthDate"].value),
      averageScore: String(this.formAddEdit.controls["averageScore"].value)

    });
    this.formAddEdit.reset();
    this.hiddenChange.emit(this.flag);
    this.listChange.emit(this.list);
  }

  submitButton(): void {
    this.submitFlag = true;
  }

  _onSubmit(): void {
    if (this.buttonName === "Сохранить" && this.submitFlag) {
      this.saveEdit();
    } else if (this.buttonName === "Добавить" && this.submitFlag) {
      this.addRow();
    }
  }
  closeButton(): void {
    this.hiddenChange.emit(this.flag);
    this.formAddEdit.reset();
  }


}
