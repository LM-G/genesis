import { AbstractControl } from '@angular/forms';

export function matchValidator(match: string) {
  return (control: AbstractControl): { [key: string]: any } => {
    const inputValue = control.value;
    const matchedInputValue = control.root.get(match);
    if (matchedInputValue && inputValue !== matchedInputValue.value) {
      return {
        'match': { value: false }
      };
    }
    return null;
  };
}
