import { Component, OnInit } from "@angular/core";
import { ElectronService } from "./core/services";
import { TranslateService } from "@ngx-translate/core";
import { AppConfig } from "../environments/environment";
import { remote, shell } from "electron";
import { join, dirname } from "path";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public btn_status: string = "START";
  public game_status: string = "All Files Look Good";

  constructor(
    public electronService: ElectronService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang("en");
    console.log("AppConfig", AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log("Mode electron");
      console.log("Electron ipcRenderer", electronService.ipcRenderer);
      console.log("NodeJS childProcess", electronService.childProcess);
    } else {
      console.log("Mode web");
    }
  }
  minimize_window() {
    remote.getCurrentWindow().minimize();
  }
  close_window() {
    remote.getCurrentWindow().close();
  }
  change_btn_status() {
    this.btn_status = "RUNNING...";
    setTimeout(() => {
      this.btn_status = "START";
    }, 5000);
    var asd = __dirname.split("\\");
    asd.pop();
    shell.openItem(join(dirname(asd.join("\\")), "ANTHEM", "demo.txt"));
  }
  launch_social_media(launch_url: string) {
    if (launch_url == "website") shell.openExternal("https://saverl.com");
    else if (launch_url == "youtube")
      shell.openExternal("https://youtube.com/saverl");
    else shell.openExternal("https://facebook.com/saverl");
  }
}
