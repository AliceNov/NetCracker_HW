import { ChangeDetectionStrategy, ChangeDetectorRef, Component,  Inject,  OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, Observable } from "rxjs";
import { APP_CONFIG } from "src/app/config.token";
import { Student } from "src/app/interfaces/data.interface";
import { LocalService } from "src/app/services/local-service.service";
import { ServerService } from "src/app/services/server-service.service";
import { GetStudents } from "src/app/store/actions/student.action";
import { selectStudentList } from "src/app/store/selectors/student.selector";
import { IAppState } from "src/app/store/state/app.state";
import * as StudentsActions from "src/app/store/actions/student.action";


@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit{
  studentsList: Student[] = [];
  students: Observable<Student[]>;

  hiddenDeleteFlag: boolean = true;
  filterHidden: boolean = true;
  turnOn: boolean = false;

  rowIndex: number = 0;
  listSize: number = 0;
  studentsSize: number = 0;

  nameButton: string = "";
  inS: string = "";
  sort: string = "";
  stud: Observable<Student[]>;
  subscrition = new BehaviorSubject(this.listSize);

  constructor(@Inject(APP_CONFIG) private serverService: LocalService | ServerService,
              private cf: ChangeDetectorRef,
              private router: Router,
              private store: Store<IAppState>) {
    this.students = serverService.findAll();
  }
  
  
  ngOnInit(): void{
   /* this.serverService.findAll().subscribe(
      (value) => {
      this.studentsList = value;
     this.cf.detectChanges();
      },
    );*/
    this.store.dispatch(GetStudents());
    this.subscrition.subscribe(
      () => {
        /*this.serverService.findAll().subscribe((value) => {
          this.studentsList = value;
          this.cf.detectChanges();
        });*/
        this.store.dispatch(GetStudents());
        this.store
        .pipe(select(selectStudentList))
        .subscribe(
          (value) => {
            this.studentsList = value;
            this.cf.detectChanges();
          }
        );
      },
    );
   this.store
    .pipe(select(selectStudentList))
    .subscribe(
      (value) => {
        this.studentsList = value;
        this.cf.detectChanges();
      }
    );
   //this.cf.detectChanges();
  }


  changeService(): void {
    this.router.navigate(["/students"], { queryParams: { debug: true } });
    this.cf.detectChanges();
  }

  change(list: Observable<Student[]>): void{
   list.subscribe(
     (value: Student[]) => {
       this.listSize = value.length;
       this.subscrition.next(this.listSize);
     },
   );
    this.students.subscribe(
      (value: Student[]) => this.studentsSize = value.length,
   );
  }

  get runChangeDetection(): void {
    return;
  }


  compare(value: string): boolean{
    if (parseFloat(value) < 3) {
      return true;
    }
    return false;

  }

  togleOn(flag: boolean): void {
    this.turnOn = flag;
    this.cf.detectChanges();
  }


  deleteButton(index: number): void {
    this.rowIndex = index;
    this.hiddenDeleteFlag = false;
    this.cf.detectChanges();
  }

  changeHidden(flag: boolean): void {
    this.hiddenDeleteFlag = flag;
  }



  showFilter(): void {
    this.filterHidden = false;
    const stud: Student[] = this.studentsList;
    this.studentsList = stud;
  }

  cleanFilter(): void {
    this.serverService.findAll().subscribe(
      (value) => {
        this.studentsList = value;
        this.cf.detectChanges();
      },
    );
  }

  filterPopUpHid(flag: boolean): void {
    this.filterHidden = flag;
  }

  filtredList(list: Student[]): void{
    this.studentsList = list;
    this.cf.detectChanges();
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
      this.studentsList = this.studentsList.sort( (stud1, stud2) => {
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
      this.studentsList = this.studentsList.sort( (stud1, stud2) => {
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
      this.studentsList = this.studentsList.sort( (stud1, stud2) => {
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
      this.studentsList = this.studentsList.sort( (stud1, stud2) => {
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
      this.studentsList = this.studentsList.sort( (stud1, stud2) => {
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
      this.studentsList = this.studentsList.sort( (stud1, stud2) => {
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
      this.studentsList = this.studentsList.sort( (stud1, stud2) => {
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
      this.studentsList = this.studentsList.sort( (stud1, stud2) => {
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
      this.studentsList = this.studentsList.sort( (stud1, stud2) => {
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
      this.studentsList = this.studentsList.sort( (stud1, stud2) => {
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

}
