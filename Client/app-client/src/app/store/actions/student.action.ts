import { Action, createAction, props } from "@ngrx/store";
import { Student } from "src/app/interfaces/data.interface";

export enum EStudentActions {
    GetStudents = '[Student] Get Students',
    GetStudentsSuccess = '[Student] Get Students Success',
    GetStudent = '[Student] Get Student',
    GetStudentSuccess = '[Student] Get Student Success',
    UpdateStudent = '[Student] Update Student',
    UpdateStudentSuccess = '[Student] Update Student Success'
}

export const GetStudents = createAction (
    EStudentActions.GetStudents
)
export const GetStudentsSuccess = createAction (
    EStudentActions.GetStudentsSuccess,
    props<{students: Student[]}>()
)

export const GetStudent = createAction (
    EStudentActions.GetStudent,
    props<{id: number}>()
)
export const GetStudentSuccess = createAction (
    EStudentActions.GetStudentSuccess,
    props<{student: Student}>()
)

export const UpdateStudent = createAction (
    EStudentActions.UpdateStudent,
    props<{student: Student; id: number}>()
)
export const UpdateStudentSuccess = createAction (
    EStudentActions.UpdateStudentSuccess,
    props<{students: Student[]}>()
)



