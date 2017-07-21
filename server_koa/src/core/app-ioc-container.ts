import { forEach } from 'lodash';
import { Container } from 'inversify';

import * as controllers from "../controller";
import * as services from "../service";
import * as repositories from "../repository";

/**
 * Inversion of control
 * TODO : don't load controllers/services/repositories with index
 */
export class AppIocContainer{
    container: Container;
    constructor(){
        this.container = new Container();
        /*
        this.bind(controllers);
        this.bind(services);
        this.bind(repositories);
        */
    }

    getContainer(): Container {
        return this.container;
    }

    private bind = (components: any[]) => {
        forEach(components, (component: any) => {
            this.container.bind(component).toSelf();
        });
    }
}