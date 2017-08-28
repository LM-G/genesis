export abstract class TechnicalError extends Error{
    details: any;
    status: number;
    constructor(message: string, status: number, details?: any){
        super(message);
        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);

        // Saving class name in the property of our custom error as a shortcut.
        this.name = this.constructor.name;
        this.status = status || 500;
        this.details = details;
    }
}