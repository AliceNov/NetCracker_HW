import { ActionReducer } from "@ngrx/store";

export function log(
    reducer: ActionReducer<any>
): ActionReducer<any> {
    return (state, action) => {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action)
    };
}