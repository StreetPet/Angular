import { isDevMode } from '@angular/core';

export default function validateAgainst(fn: Function) {
  return (target: any, prop: string) => {
    if (isDevMode()) {
      return;
    }

    /** Internal value we will be changing and returning in our getter */
    let _value = null;

    // Create new property with getter and setter
    Object.defineProperty(target, prop, {
      get() {
        return _value;
      },
      set: function (newVal) {
        _value = newVal;
        fn(target, prop, newVal);
      },
      configurable: true,
      enumerable: true
    });
  }
}