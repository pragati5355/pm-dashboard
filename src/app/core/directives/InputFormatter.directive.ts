import { Directive, ElementRef, Input, HostListener } from "@angular/core";

@Directive({
  selector: "[InputFormatter]"
})
export class InputFormatterDirective {
  constructor(private el: ElementRef) {}

  @Input() InputFormatter: String = "";

  @HostListener("keydown", ["$event"])
  formatInputText(event: any) {
    let e = <KeyboardEvent>event;
    const value = (event.target as HTMLInputElement).value;
    if (this.checkCommonInputs(e)) {
      return;
    }
    switch (this.InputFormatter) {
      case "numeric":
        if (
          (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
          (e.keyCode < 96 || e.keyCode > 105)
        ) {
          if (!e.code.startsWith("Digit") && !e.code.startsWith("Numpad")) {
            e.preventDefault();
          }
        }
        break;
      case "alpha":
        if (
          e.keyCode != 32 &&
          (e.keyCode < 65 || e.keyCode > 90) &&
          (e.keyCode < 96 || e.keyCode > 122)
        ) {
          e.preventDefault();
        }
        break;

      case "alphanumeric":
        if (
          (e.keyCode > 64 && e.keyCode < 91) ||
          (e.keyCode > 96 && e.keyCode < 123) ||
          (e.keyCode >= 48 && e.keyCode <= 57 && !e.shiftKey)
        ) {
          return;
        } else {
          e.preventDefault();
        }
        break;
      case "noSpaceAround":
        const isWhitespace = value.trim().length === 0;
        const isValid = !isWhitespace;
        if (isValid || value === null || value === "") {
          return;
        } else {
          e.preventDefault();
        }
        break;

      case "weight":
        if (
          (e.keyCode > 64 && e.keyCode < 91) ||
          (e.keyCode > 96 && e.keyCode < 123) ||
          (e.keyCode >= 48 && e.keyCode <= 57 && !e.shiftKey)
        ) {
          return;
        } else if (e.keyCode == 190) {
          return;
        } else {
          e.preventDefault();
        }
        break;
      default:
        e.preventDefault();
        break;
    }
  }

  checkCommonInputs(e: KeyboardEvent) {
    if (
      [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
      (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
      (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
      (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
      (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
