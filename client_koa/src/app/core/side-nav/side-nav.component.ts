import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { SideNavService } from './side-nav.service';

/**
 * Side navigation component
 */
@Component({
    selector: 'genesis-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['side-nav.component.scss'],
    animations: [
        trigger('display', [
            state('expanded', style({
                flex: '1 1 200px',
                maxWidth: '200px',
                minWidth: '200px'
            })),
            state('collapsed', style({
                flex: '1 1 25px',
                maxWidth: '25px',
                minWidth: '25px'
            })),
            transition('expanded => collapsed', animate('150ms ease-in')),
            transition('collapsed => expanded', animate('150ms ease-out'))
        ]),
    ]
})
export class SideNavComponent implements OnInit{
    // determines in which state is the side nav
    state: string = 'expanded';

    /**
     * Side nav component's constructor
     * @param sideNarService holds the real state of side nav which his shared through the application
     */
    constructor(private sideNarService: SideNavService) {}

    ngOnInit(): void {
        console.log('sidebar initialisée');
        // initialises the state with the value stored in side nav service
        this.setState(this.sideNarService.isCollapsed().getValue());

        // listen every change of collapsed value in the service
        this.sideNarService.isCollapsed().subscribe({
            next: (collapsed: boolean) => this.setState(collapsed)
        });
    }

    /**
     * Set the side nav state with a value, 'collapsed' if true, else 'expanded'
     * @param value
     */
    private setState(value: boolean){
        this.state = value ? 'collapsed' : 'expanded';
    }
}
