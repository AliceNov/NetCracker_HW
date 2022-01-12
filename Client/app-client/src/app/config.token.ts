import { HttpClient } from "@angular/common/http";
import { InjectionToken, Provider } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LocalService } from "./services/local-service.service";
import { ServerService } from "./services/server-service.service";
export interface AppConfig {
    enable: boolean;
}

export const APP_CONFIG = new InjectionToken<LocalService | ServerService>("app.config");

export const serverLocalProvider: Provider = {
    provide: APP_CONFIG,
    useFactory: providerFactory,
    deps: [HttpClient, ActivatedRoute]
};

function providerFactory (http: HttpClient, router: ActivatedRoute): LocalService | ServerService {
    let paramDebug = false;
     router.root.queryParams.subscribe(
        (params) => paramDebug = params["debug"],
     );

    if (paramDebug) {
        return new LocalService(http);
    }
        return new ServerService(http);

}

