export function Form<T extends { new(...args: any[]): {} }>(Target: T) {
    const Wrapper = class extends Target {
        constructor(...value) {
            super(...value);
            if (value[ 0 ]) {
                Object.assign(this, value[ 0 ]);
            }
        }

        static of(form: any) {
            return new this(form);
        }
    };
    return Object.assign(Wrapper, Target);
}
