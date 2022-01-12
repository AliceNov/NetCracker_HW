import { AbstractControl } from "@angular/forms";

export function validateDOB(control: AbstractControl): { [key: string]: boolean } | null {
    const currentDate = new Date();
    const tenYearsCurrentDate = new Date(currentDate.getTime() - (1000 * 60 * 60 * 24 * 365 * 10));
    tenYearsCurrentDate.setHours(0, 0, 0, 0);

    const controlDate = new Date(control.value);
    controlDate.setHours(0, 0, 0, 0);

    if (tenYearsCurrentDate < controlDate) {
        return { birthDate: true };
    }

    return null;
}
