import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { exhaustMap, map, mergeMap } from "rxjs/operators";
import { Student } from "src/app/interfaces/data.interface";
import { ServerService } from "src/app/services/server-service.service";
import { IAppState } from "../state/app.state";
import * as StudentsActions from '../actions/student.action';

@Injectable()
export class StudentEffects {
    updateStudent$ = createEffect(() => 
        this.actions$.pipe(
            ofType(StudentsActions.UpdateStudent),
            exhaustMap(({student, id}) => 
            this.serverService.updateOne(student, id).pipe(
                map((list: Student[]) => {
                    return StudentsActions.UpdateStudentSuccess({
                        students: list
                    });
                })
            ))
        )
    );

    getStudents$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StudentsActions.GetStudents),
            mergeMap(() => this.serverService.findAll()
                .pipe(
                    map((list: Student[]) => {
                        return StudentsActions.GetStudentsSuccess({
                            students: list
                        })
                    })
                )
            )
        )
    );
    
    getStudent$ = createEffect(() => 
        this.actions$.pipe(
            ofType(StudentsActions.GetStudent),
            exhaustMap(({id}) => 
            this.serverService.findOne(id).pipe(
                map((data: Student) => {
                    return StudentsActions.GetStudentSuccess({
                        student: data
                    });
                })
            ))
        )
    );

    constructor(
        private actions$: Actions,
        private serverService: ServerService,
        private store: Store<IAppState>
    ) {}
}