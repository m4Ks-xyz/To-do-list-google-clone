import { ChangeDetectionStrategy, Component, output } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
	selector: 'app-nav-bar',
	imports: [MatToolbarModule, MatButtonModule, MatIconModule],
	templateUrl: './nav-bar.component.html',
	styleUrl: './nav-bar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
	sideNavToggle = output<void>();

	toggleSideNav(): void {
		this.sideNavToggle.emit();
	}
}
