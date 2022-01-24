import { EStudentActions } from "../actions/student.action";
import { initialStudentState, StudentState } from "../state/student.state";
import * as StudentActions from '../actions/student.action';
import { exhaustMap } from "rxjs";
import { Action, createReducer, on } from "@ngrx/store";
import { Actions } from "@ngrx/effects";

/*export const studentReducers = (
    state = initialStudentState,
    action: StudentActions
): StudentState => {
    switch (action.type) {
        case EStudentActions.GetStudentsSuccess: {
            return { ...state, students: action.payload };
        }
        case EStudentActions.GetStudentSuccess: {
            return { ...state, selectedStudent: action.payload};
        }
        case EStudentActions.CreateStudentSuccess: {
            return { ...state, students: action.payload};
        }
        case EStudentActions.DeleteStudentSuccess: {
            return { ...state, students: action.payload};
        }

       

        default: 
            return state;
    }   
}*/

const _studentReducers = createReducer(
    initialStudentState,
    on(StudentActions.GetStudents, (state) => ({...state})),
    on(StudentActions.GetStudentsSuccess, (state, action) => ({...state, students: action.students})),
    on(StudentActions.GetStudent, (state) => ({...state})),
    on(StudentActions.GetStudentSuccess, (state, action) => ({...state, student: action.student})),
    on(StudentActions.UpdateStudent, (state) => ({...state})),
    on(StudentActions.UpdateStudentSuccess, (state, action) => ({...state, students: action.students}))
)

export const studentReducers = (
    state = initialStudentState,
    action: Action
): StudentState => {
    return _studentReducers(state, action);
}