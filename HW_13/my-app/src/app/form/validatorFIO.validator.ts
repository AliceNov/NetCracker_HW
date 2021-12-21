import { AbstractControl } from "@angular/forms";

export function validateFIO (controls: AbstractControl): { [key: string]: boolean } | null {
    const last = controls.get("lastName");
    const first = controls.get("firstName");
    const middle = controls.get("middleName");

    if (last?.value === first?.value && first?.value !== "") {
        return {
            matchedLast: true
        };
    }

    if (first?.value === middle?.value && first?.value !== "") {
        return {
            matchedMiddle: true
        };
    }

    return null;
}
