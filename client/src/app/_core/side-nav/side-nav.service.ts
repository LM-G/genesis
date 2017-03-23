import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Manage the side nav state
 */
@Injectable()
export class SideNavService {
    private collapsed : BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() {}

    /**
     * Toggle the collapsed state value
     */
    toggle() : void {
        this.collapsed.next(!this.collapsed.getValue());
    }

    /**
     * Gets the subject containing information about collapse state
     * @returns {BehaviorSubject<boolean>}
     */
    isCollapsed() : BehaviorSubject<boolean>{
        return this.collapsed;
    }
}