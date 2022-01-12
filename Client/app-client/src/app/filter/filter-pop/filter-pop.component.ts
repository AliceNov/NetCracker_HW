import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Student } from "src/app/interfaces/data.interface";
import { ServerService } from "src/app/services/server-service.service";

@Component({
  selector: "app-filter-pop",
  templateUrl: "./filter-pop.component.html",
  styleUrls: ["./filter-pop.component.less"],
  providers: [ServerService]
})
export class FilterPopComponent implements OnInit {
  @Output() hidFlag = new EventEmitter<boolean>();

   list: Student[] = [];
  @Output() filtList = new EventEmitter<Student[]>();
  @Output() togFlag = new EventEmitter<boolean>();

  listFil: Student[] = [];

  turnOn: boolean = false;
  fromDate: string = "";
  toDate: string = "";
  fromNum: string = "";
  toNum: string = "";
  filterHidden!: boolean;
  ggg: string = "";


  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
   this.serverService.findAll().subscribe(
     (value) => {
       this.list = value;
     },
   );
  }



  toggleChecked(event: any): void {
    if (event.target.checked){
          this.turnOn = true;
          this.togFlag.emit(this.turnOn);
    } else if (!event.target.checked){
      this.turnOn = false;
      this.togFlag.emit(this.turnOn);
    }
  }
  confirmFilter(flag: boolean): void{
    if (flag) {
      this.listFil = this.list;
      if (this.fromDate && this.toDate){
        this.filterByDate();
      }
      if (this.fromNum && this.toNum) {
        this.filterByScore();
      }
      /* if (!this.fromNum || !this.toNum){
       this.dataService.setFilterList(this.studentList);
       this.filtList.emit(this.list);
      }*/
     //  this.filterHidden = this.dataService.setFilterFlag(true);
      this.hidFlag.emit(true);
    } else if (!flag){
      this.hidFlag.emit(true);
    //  this.dataService.setFilterFlag(true);
      return;
    }
  }

  filterByDate(): void{
    this.listFil = this.listFil.filter((stud) => {
      const start = new Date(this.fromDate);
      const end = new Date(this.toDate);
      if (new Date(stud.birthDate) > start && new Date(stud.birthDate) < end) {
        return stud;
      }
      return false;
    });
    this.filtList.emit(this.listFil);
   // this.dataService.setFilterList(this.studentList);
  }

  filterByScore(): void {
   this.listFil = this.listFil.filter((stud) => {
      const start = parseFloat(this.fromNum);
      const end = parseFloat(this.toNum);
      if (parseFloat(stud.averageScore) >= start && parseFloat(stud.averageScore) <= end) {
        return stud;
      }
      return false;
      });
      this.filtList.emit(this.listFil);
   //   this.dataService.setFilterList(this.filtList);*/
  }
}
