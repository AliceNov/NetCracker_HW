import { Pipe, PipeTransform } from "@angular/core";
import { Student } from "src/app/interfaces/data.interface";


@Pipe({
    name: "searchpipe"
})
export class SearchPipe implements PipeTransform {
    transform(students: Student[], input: string): Student[] {
      if (input === undefined) {
          return students;
      }
      if (input === "") {
        return students;
      }
      return students.filter((student: Student) => {
        const st = student.firstName.toLowerCase() + " " + student.lastName.toLowerCase();
        const fio2 = student.lastName.toLowerCase() + " " + student.firstName.toLowerCase();
        if (student.firstName.toLowerCase().includes(input.toLowerCase())){
              return student.firstName;
        }
        if (student.lastName.toLowerCase().includes(input.toLowerCase())){
            return student.lastName;
        }
        if (st.includes(input.toLowerCase()) || fio2.includes(input)){
            return student.firstName && student.lastName;
        }
        return false;

      });
    }

}
