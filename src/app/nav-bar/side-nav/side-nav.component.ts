import { Component, effect, input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@Component({
	selector: 'app-side-nav',
	imports: [
		MatSidenavModule,
		MatButtonModule,
		MatDividerModule,
		MatIconModule,
		MatCardModule,
		MatCheckboxModule,
		MatRadioModule,
	],
	templateUrl: './side-nav.component.html',
	styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
	toggleSidenav = input<boolean>(true);
	sidenavIsOpen = this.toggleSidenav();
	showFiller: boolean = false;

	constructor() {
		effect(() => {
			this.sidenavIsOpen = this.toggleSidenav();
		});
	}
}
