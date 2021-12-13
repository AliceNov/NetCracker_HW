import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "scoreFilter" })
export class FilterScorePipe implements PipeTransform {
    transform(students: any[], from: string, to: string): any {
        if (!from || !to){
            return students;
        }
       return students.filter((stud) => {
            const start = parseFloat(from);
            const end = parseFloat(to);
            if (parseFloat(stud.averageScore) >= start && parseFloat(stud.averageScore) <= end) {
              return stud;
            }
            return false;
          });
    }
}
