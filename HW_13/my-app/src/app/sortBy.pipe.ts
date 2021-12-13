import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "sortBy" })
export class SortByPipe implements PipeTransform {
    transform(students: any[], sortBy: string): any {
        if (sortBy === ""){
            return students;
        }

        if (sortBy === "last"){
            return students.sort( (stud1, stud2) => {
                if (stud1.lastName.toLowerCase() < stud2.lastName.toLowerCase()) {
                  return -1;
                }
                if (stud1.lastName.toLowerCase() > stud2.lastName.toLowerCase()) {
                    return 1;
                  }
                      return 0;


              });
        }
        if (sortBy === "first"){
            return students.sort( (stud1, stud2) => {
                if (stud1.firstName.toLowerCase() < stud2.firstName.toLowerCase()) {
                  return -1;
                }
                if (stud1.firstName.toLowerCase() > stud2.firstName.toLowerCase()) {
                    return 1;
                  }
                      return 0;


              });
        }
        if (sortBy === "middle"){
            return students.sort( (stud1, stud2) => {
                if (stud1.middleName.toLowerCase() < stud2.middleName.toLowerCase()) {
                  return -1;
                }
                if (stud1.middleName.toLowerCase() > stud2.middleName.toLowerCase()) {
                    return 1;
                  }
                      return 0;


              });
        }
        if (sortBy === "score"){
            return students.sort( (stud1, stud2) => {
                if (parseFloat(stud1.averageScore) < parseFloat(stud2.averageScore)) {
                  return -1;
                }
                if (parseFloat(stud1.averageScore) > parseFloat(stud2.averageScore)) {
                    return 1;
                  }
                      return 0;


              });
        }
        if (sortBy === "date"){
            return students.sort( (stud1, stud2) => {
                if (new Date(stud1.birthDate) < new Date(stud2.birthDate)) {
                  return -1;
                }
                if (new Date(stud1.birthDate) > new Date(stud2.birthDate)) {
                    return 1;
                  }
                      return 0;


              });
        }
        return students;

    }
}
