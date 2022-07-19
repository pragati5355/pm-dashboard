import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { IDeactivateComponent } from "./decativate.guard";

@Injectable({ providedIn: "root" })
export class FormDeactivateService
  implements CanDeactivate<IDeactivateComponent> {
  canDeactivate(component: IDeactivateComponent): boolean {
    if (!component.canExit()) {
      if (
        confirm(
          "You have unsaved changes! If you leave, your changes will be lost."
        )
      ) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}
