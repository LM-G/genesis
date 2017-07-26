/**
 * Injectable class delivers the injectable and additional informations
 */
export class Injectable {
    public instance: any;
    public constructorParams: any[];
    public instanceCount: number = 0;
}