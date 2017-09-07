export interface FieldMetadataArgs{
    target: Function;
    property: string;
    options?: any;
    virtual?: Boolean;
    embedded?: Boolean;
}
export class FieldMetadata{
    target: Function;
    property: string;
    options: any;
    virtual: Boolean;
    embedded: Boolean;
    constructor(args : FieldMetadataArgs){
        this.target =  args.target;
        this.property =  args.property;
        this.options = args.options;
        this.virtual = args.virtual || false;
        this.embedded = args.embedded || false;
    }
}