import { RouterReducerState } from "@ngrx/router-store";
import { initialStudentState, StudentState } from "./student.state";

export interface IAppState {
    router?: RouterReducerState;
    students: StudentState;
}

export const initialAppState: IAppState = {
    students: initialStudentState,
}

export function getInitialState(): IAppState {
    return initialAppState;
}