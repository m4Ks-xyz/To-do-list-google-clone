import { Component, signal } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideNavComponent } from './nav-bar/side-nav/side-nav.component';

@Component({
	selector: 'app-root',
	imports: [NavBarComponent, SideNavComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	sideNavState = signal(true);

	// toggledValue = true;

	// toggleSideNav(toggleStatus: boolean): boolean {
	// 	this.toggledValue = toggleStatus;
	// 	return this.toggledValue;
	// }
}
