import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { IDeactivateComponent } from "./decativate.guard";

@Injectable({ providedIn: "root" })
export class BlockRouteService implements CanDeactivate<IDeactivateComponent> {
  canDeactivate(component: IDeactivateComponent): boolean {
    if (!component.canExit()) {
      return false;
    }
    return true;
  }
}
