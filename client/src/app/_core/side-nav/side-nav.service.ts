import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Manage the side nav state
 */
@Injectable()
export class SideNavService {
    private collapsed : BehaviorSubject<boolean> = new BehaviorSubject(null);

    constructor() {
        let isCollapsed = JSON.parse(localStorage.getItem('side_nav_collapsed')) || false;
        this.collapsed.next(isCollapsed)
    }

    /**
     * Toggle the collapsed state value
     */
    toggle() : void {
        this.collapsed.next(!this.collapsed.getValue());
        localStorage.setItem('side_nav_collapsed', JSON.stringify(this.collapsed.getValue()));
    }

    /**
     * Gets the subject containing information about collapse state
     * @returns {BehaviorSubject<boolean>}
     */
    isCollapsed() : BehaviorSubject<boolean>{
        return this.collapsed;
    }
}