import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { Student } from "../interfaces/data.interface";



@Injectable({
  providedIn: "root"
})
export class ServerService {
  students: Student[] = [];

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Student[]> {
    return this.http.get<Student[]>("api/students")
    .pipe( tap(
      (value) => {
        this.students = value;
      },
    ));
  }

  findOne(id: number): Observable<Student> {
    return this.http.get<Student>("api/students/" + id);
  }

  create(student: Student): Subscription {
    return this.http.post<Student[]>("api/students/", student).subscribe();
  }

  delete(index: number): Observable<Student[]> {
    return this.http.delete<Student[]>("api/students/delete/" + index);
  }

  updateOne(student: Student, id: number): Subscription {
    return this.http.post<Student[]>("api/students/save/" + id, student).subscribe();
  }
}
