import { routerReducer } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { studentReducers } from "./student.reducers";
import * as studReducers from "../reducers/student.reducers";

export const appReducers: ActionReducerMap<IAppState, any> = {
    router: routerReducer,
    students: studReducers.studentReducers,
};