import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Manage the side nav state
 */
@Injectable()
export class SideNavService {
    /** Collapse state */
    private collapsedState : BehaviorSubject<boolean> = new BehaviorSubject(null);

    /**
     * SideNavService's constructor. Initialize side nav state depending of what value was previously stored in local storage.
     */
    constructor() {
        let isCollapsed = JSON.parse(localStorage.getItem('side_nav_collapsed')) || false;
        this.collapsedState.next(isCollapsed)
    }

    /**
     * Toggle the collapsed state value
     */
    toggle() : void {
        this.collapsedState.next(!this.collapsedState.getValue());
        localStorage.setItem('side_nav_collapsed', JSON.stringify(this.collapsedState.getValue()));
    }

    /**
     * Gets the subject containing information about collapse state
     * @returns {BehaviorSubject<boolean>}
     */
    isCollapsed() : BehaviorSubject<boolean>{
        return this.collapsedState;
    }
}