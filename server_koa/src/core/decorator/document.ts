import { DocumentMetadata } from '../metadata/document';
import { registerDocumentMetadata } from '../index';

export type DocumentOptions = {
    name: string;
    options?: any;
}
export function Document(opts: DocumentOptions) {
    return (target: Function) => {
        const meta = new DocumentMetadata({
            target: target,
            name: opts.name,
            options: opts.options
        });
        registerDocumentMetadata(meta);
    }
}