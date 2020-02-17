export default function isRequired(requiredType?: 'string' | 'boolean' | 'number') {
    return (target: any, prop: string) => {

        const NG_ON_ONIT_NAME = 'ngOnInit';

        /** ngOnInit might not be implemented by this component */
        const ngOnInitClone: Function | null = target[NG_ON_ONIT_NAME];

        Object.defineProperty(target, NG_ON_ONIT_NAME, {
            value: function () {

                if (this[prop] == null) {
                    console.error(
                        target.constructor.name +
                        `: ${prop} is required, but was not provided`
                    );
                } else if (requiredType && typeof this[prop] !== requiredType) {
                    console.error(
                        target.constructor.name +
                        `: ${prop} is expected to be a ${requiredType}, but ${typeof this[prop]} was provided`
                    );
                }
                // Calling the original ngOnInit with its original context
                // 
                if (ngOnInitClone) {
                    ngOnInitClone.call(this);
                }
            }
        });
    }
}