export interface FieldMetadataArgs{
    target: Function;
    property: string;
    options: Object;
}
export class FieldMetadata{
    target: Function;
    property: string;
    options: Object;
    constructor(args : FieldMetadataArgs){
        this.target =  args.target;
        this.property =  args.property;
        this.options = args.options;
    }
}