import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";
import { Student } from "src/app/interfaces/data.interface";
import { ServerService } from "src/app/services/server-service.service";

@Component({
  selector: "app-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteComponent implements OnInit {
  @Input() index!: number;
  @Output() list = new EventEmitter<Observable<Student[]>>();
  @Output() hiddenFlag = new EventEmitter<boolean>();

  constructor(private serverService: ServerService,
    private cf: ChangeDetectorRef) { }

  ngOnInit(): void {
    return;
  }

  get runChangeDetection(): void {
    return;
  }

  confirmDialog(flag: boolean): void {
    if (flag) {
      this.delete();
      this.hiddenFlag.emit(true);
    } else {
      this.hiddenFlag.emit(true);
      return;
    }
  }

  delete(): void {
    this.list.emit(this.serverService.delete(this.index));
    this.cf.detectChanges();
  }
}
