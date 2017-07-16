/**
 * Custom types
 * Created by LM-G on 15/07/2017.
 */
declare module NodeJS  {
    // Add __srcDir property on already existing NodeJs.Global interface
    interface Global {
        __srcDir: String
    }
}
declare module "*.json" {
    const value: any;
    export default value;
}