import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SideNavComponent } from './side-nav/side-nav.component';

@Component({
	selector: 'app-nav-bar',
	imports: [MatToolbarModule, MatButtonModule, MatIconModule, SideNavComponent],
	templateUrl: './nav-bar.component.html',
	styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
	togglingSideNav: boolean = true;

	toggleSideNav(): boolean {
		return (this.togglingSideNav = !this.togglingSideNav);
	}
}
