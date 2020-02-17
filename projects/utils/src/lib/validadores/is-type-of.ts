export default function isTypeOf(requiredType: 'string' | 'boolean' | 'number') {
  return (target: any, prop: string) => {
    /** Internal value we will be changing and returning in our getter */
    let _value = null;

    // Create new property with getter and setter
    Object.defineProperty(target, prop, {
      get() {
        return _value;
      },
      set: function (newVal) {
        _value = newVal;

        /** Whether the new value matches the required type */
        const matchesRequiredType = typeof newVal === requiredType;

        if (!matchesRequiredType) {
          console.error(
            target.constructor.name +
            `: @Input '${prop}' is expected to be of type ${requiredType}, but type ${typeof newVal} was provided`
          );
        }
      },
      configurable: true,
      enumerable: true
    });

  }
}