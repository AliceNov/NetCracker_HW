import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "dateFilter" })
export class FilterPipe implements PipeTransform {
    transform(students: any[], from: string, to: string): any {
        if (!from || !to){
            return students;
        }
       return students.filter((stud) => {
            const start = new Date(from);
            const end = new Date(to);
            if (new Date(stud.birthDate) > start && new Date(stud.birthDate) < end) {
              return stud;
            }
            return false;
          });
    }
}
