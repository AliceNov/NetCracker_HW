import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Student } from "src/app/interfaces/data.interface";
import { ServerService } from "src/app/services/server-service.service";
import { validateDOB } from "src/app/validators/validatorDOB.validator";
import { validateFIO } from "src/app/validators/validatorFIO.validator";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnDestroy {

  @Input() formAddEdit!: FormGroup;
  list: Student[] = [];
  buttonName: string = "Подтвердить";
  @Input() index: number = 0;
  submitFlag: boolean = false;
  neId = 0;



  editFlag: boolean = false;
  createFlag: boolean = false;
  id: number = 0;
  student: Student = {
    lastName: "",
    firstName: "",
    middleName: "",
    birthDate: "",
    averageScore: ""
  };

  currDate?: Date;
  subscrition: Subscription | undefined;
  constructor(private fb: FormBuilder,
              private cf: ChangeDetectorRef,
              private serverService: ServerService,
              private router: ActivatedRoute,
               ) {


    this.formAddEdit =  this.fb.group({
      birthDate: ["", [Validators.required, validateDOB]],
      averageScore: ["", Validators.required],
      fio: this.fb.group({
        lastName: ["", Validators.required],
        firstName: ["", Validators.required],
        middleName: ["", Validators.required]
    }, { validator: [validateFIO] })
    });

  }



  ngOnInit (): void{
    this.currDate = new Date();
    const  currentDate: Date = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 10);
    this.currDate = currentDate;

    this.subscrition = this.router.params.subscribe(
      (params) => {
        this.id = params["id"];
        if (this.id) {
          this.edit(this.id);

        } else {
          this.createFlag = true;
        }
        this.cf.detectChanges();
      },
    );


  }

  get runChangeDetection(): void {
    return ;
  }

  edit(index: number): void {
    this.serverService.findOne(index).subscribe(
      (st: Student) => {
this.student = st;
        this.editSet(st);
      this.cf.detectChanges();
},
     );
  }

  editSet(student: Student): void {
    this.editFlag = true;
    this.formAddEdit.get("fio")?.get("lastName")?.setValue(student.lastName);
    this.formAddEdit.get("fio")?.get("firstName")?.setValue(student.firstName);
    this.formAddEdit.get("fio")?.get("middleName")?.setValue(student.middleName);
    this.formAddEdit.controls["birthDate"].setValue(student.birthDate);
    this.formAddEdit.controls["averageScore"].setValue(student.averageScore);
    this.cf.detectChanges();
    return;
  }
  saveEdit(): void {

    const stud = {
      lastName:this.formAddEdit.get("fio")?.get("lastName")?.value,
      firstName: this.formAddEdit.get("fio")?.get("firstName")?.value,
      middleName:this.formAddEdit.get("fio")?.get("middleName")?.value,
      birthDate: String(this.formAddEdit.controls["birthDate"].value),
      averageScore: String(this.formAddEdit.controls["averageScore"].value)
    };
    this.serverService.updateOne(stud, this.id);
   // this.cf.detectChanges();

  }

  addRow(): void {
    const stud = {
      "lastName":this.formAddEdit.get("fio")?.get("lastName")?.value,
      "firstName": this.formAddEdit.get("fio")?.get("firstName")?.value,
      "middleName":this.formAddEdit.get("fio")?.get("middleName")?.value,
      "birthDate": String(this.formAddEdit.controls["birthDate"].value),
      "averageScore": String(this.formAddEdit.controls["averageScore"].value)
    };
    this.serverService.create(stud);
   // this.cf.detectChanges();
  }

  submitButton(): void {
    if (this.editFlag) {
      this.saveEdit();
      this.editFlag = false;
    } else if (this.createFlag) {
      this.addRow();
      this.createFlag = false;
    }

  }

  _onSubmit(): void {

  }
  closeButton(): void {
    this.formAddEdit.reset();
    this.editFlag = false;
    this.createFlag = false;
  }
  ngOnDestroy(): void {
    this.subscrition?.unsubscribe();
  }
}
