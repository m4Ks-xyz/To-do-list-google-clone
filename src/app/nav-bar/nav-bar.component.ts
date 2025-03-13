import { Component, input, WritableSignal } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
	selector: 'app-nav-bar',
	imports: [MatToolbarModule, MatButtonModule, MatIconModule],
	templateUrl: './nav-bar.component.html',
	styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
	sideNavState = input<WritableSignal<boolean>>();

	toggleSideNav(): void {
		this.sideNavState()?.update((prev) => !prev);
	}

	// @Output() togglingSideNav = new EventEmitter<boolean>();
	// isTogglingSideNav = true;

	// toggleSideNav(): void {
	// 	this.isTogglingSideNav = !this.isTogglingSideNav;
	// 	return this.togglingSideNav.emit(this.isTogglingSideNav);
	// }
}
