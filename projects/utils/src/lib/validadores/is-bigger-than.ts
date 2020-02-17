export default function isBiggerThan(value: number) {
  return (target, prop, newVal) => {
    /** Whether the new value matches the required type */
    const isValid = newVal > value;

    if (!isValid) {
      console.error(
        target.constructor.name +
        `: @Input '${prop}' is expected to be bigger than ${value}, but value ${newVal} was provided`
      );
    }
  }
}