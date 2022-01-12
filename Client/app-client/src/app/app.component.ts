import { Component } from "@angular/core";
import { LocalService } from "./services/local-service.service";
import { ServerService } from "./services/server-service.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
  providers: [ServerService, LocalService]
})
export class AppComponent {



}

