import { Student } from "src/app/interfaces/data.interface";

export interface StudentState {
    students: Student[],
    student: Student
}

export const initialStudentState:  StudentState = {
    students: null,
    student: null
}