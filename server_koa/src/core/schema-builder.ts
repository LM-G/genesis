import {DocumentMetadata} from './metadata/document';
import {FieldMetadata} from './metadata/field';
import {Schema, SchemaDefinition, SchemaOptions} from 'mongoose';
import {isEmpty, isObject} from 'lodash';
import {LOGGER} from '../../config/logger';

/**
 * Build a mongoose schema from a document metadata
 */
export class SchemaBuilder{
    schema: {
        definition: SchemaDefinition,
        options: SchemaOptions
    };
    documentMetadata: DocumentMetadata;
    constructor(meta: DocumentMetadata){
        this.schema = {
            definition: {},
            options: null
        };
        this.documentMetadata = meta;
    }

    build(){
        let definition = this.schema.definition;
        this.documentMetadata.fields
            .forEach((field: FieldMetadata) => {
                if(isObject(field.options)){
                    definition[field.property] = field.options;
                    definition[field.property]['type'] = SchemaBuilder.getSchemaType(field);
                } else {
                    definition[field.property] = SchemaBuilder.getSchemaType(field);
                }
            });
        LOGGER.info(`Schema options generated for document ${this.documentMetadata.name} :`, definition);
        if(!isEmpty(this.documentMetadata.options)){
            this.schema.options = this.documentMetadata.options;
        }
        return this.schema;
    }

    private static getSchemaType(field: FieldMetadata){
        //TODO embedded + objectid + documentarray -> use @Id, @Embeded, @DocumentArray
        const type = Reflect.getMetadata('design:type', field.target.prototype, field.property);
        switch (type){
            case String: return Schema.Types.String;
            case Boolean: return Schema.Types.Boolean;
            case Array: return Schema.Types.Array;
            case Number: return Schema.Types.Number;
            case Date: return Schema.Types.Date;
            default:
                const err = `Unknow schema type for property "${field.property}" on document "${field.target.name}"`;
                throw new TypeError(err);
        }
    }
}