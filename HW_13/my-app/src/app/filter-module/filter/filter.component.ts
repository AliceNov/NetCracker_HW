import { Component, OnInit, KeyValueDiffer, KeyValueDiffers, DoCheck } from "@angular/core";
import { DataService, Student } from "src/app/data.service";


@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"]
})
export class FilterComponent implements OnInit, DoCheck {
  studentList: Student[] = [];
  filtList: Student[] = [];
  turnOn: boolean = false;
  fromDate: string = "";
  toDate: string = "";
  fromNum: string = "";
  toNum: string = "";
  filterHidden!: boolean;
  ggg: string = "";

  differ:  KeyValueDiffer<string, any> | null;
  constructor(private dataService: DataService, private keyValueDiffers: KeyValueDiffers) {
    this.differ = this.keyValueDiffers.find(this.dataService).create();
  }

  ngOnInit(): void {
    this.studentList = this.dataService.getData();
  }

  ngDoCheck(): void {
    if (this.differ?.diff(this.dataService) != null ){
        this.studentList = this.dataService.getData();
    }
  }

  toggleChecked(event: any): void {
    if (event.target.checked){
          this.turnOn = true;
    } else if (!event.target.checked){
      this.turnOn = false;
    }
  }
  confirmFilter(flag: boolean): void{
    if (flag) {
      this.filtList = this.studentList;
      if (this.fromDate && this.toDate){
        this.filterByDate();
      }
      if (this.fromNum && this.toNum) {
        this.filterByScore();
      }
      if (!this.fromNum || !this.toNum){
        this.dataService.setFilterList(this.studentList);
      }
       this.filterHidden = this.dataService.setFilterFlag(true);
    } else if (!flag){
      this.dataService.setFilterFlag(true);
      return;
    }
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

    this.dataService.setFilterList(this.studentList);
  }

  filterByScore(): void {
    this.filtList = this.filtList.filter((stud) => {
      const start = parseFloat(this.fromNum);
      const end = parseFloat(this.toNum);
      if (parseFloat(stud.averageScore) >= start && parseFloat(stud.averageScore) <= end) {
        return stud;
      }
      return false;
      });
      this.dataService.setFilterList(this.filtList);
  }
}
