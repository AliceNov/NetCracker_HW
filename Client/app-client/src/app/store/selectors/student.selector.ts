import { createSelector, select } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { StudentState } from "../state/student.state";

const selectStudents = (state: IAppState) => state.students;

export const selectStudentList = createSelector(
    selectStudents,
    (state: StudentState) => state.students
);

export const selectSelectedStudent = createSelector (
    selectStudents,
    (state: StudentState) => state.student
);

export const selectUpdateStudent = createSelector (
    selectStudents,
    (state: StudentState) => state.students
)