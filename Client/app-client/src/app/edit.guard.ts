import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { map, Observable } from "rxjs";
import { Student } from "./interfaces/data.interface";
import { ServerService } from "./services/server-service.service";

@Injectable({ providedIn: "root" })
export class EditGuard implements CanActivate{
    student: Student[] = [] ;
    score: number = 0;
    constructor(private serverService: ServerService ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const id: number = route.params["id"];

        return this.serverService.findOne(id).pipe(
            map(
                (value) => {
                    this.score = +value.averageScore;
                    return this.score === 5 ? false : true;
                },
            ),
        );
    }


}
