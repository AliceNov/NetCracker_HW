import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, Subscription, tap } from "rxjs";
import { Student } from "../interfaces/data.interface";


@Injectable({
  providedIn: "root"
})
export class LocalService {
  students: Student[] = [];

  constructor(private http: HttpClient) { }

  findAll(): Observable<Student[]> {
    return this.http.get<Student[]>("assets/students.json")
    .pipe(tap(
      (value) => {
        this.students = value;
      },
    ));
  }

  findOne(id: number): Observable<Student> {
    const student = this.students[id];
    return of(student);
  }

  create(student: Student): Subscription {
    this.students.push(student);
    return of(this.students).subscribe();
  }

  delete(index: number): Observable<Student[]> {
    this.students.splice(index, 1);
    return of(this.students);
  }

  updateOne(student: Student, id: number): Subscription {
    this.students[id].firstName = student.firstName;
    this.students[id].lastName = student.lastName;
    this.students[id].middleName = student.middleName;
    this.students[id].birthDate = student.birthDate;
    this.students[id].averageScore = student.averageScore;
    return of(this.students).subscribe();
  }
}
