import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	output,
	signal,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewListComponent } from '../../new/new-list/new-list.component';
import { generateRandomId } from '../../utils/generate-random-id.util';
import { ToDoList } from '../../to-do-list/to-do-list/models/to-do-list.model';

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
		MatDialogModule,
	],
	templateUrl: './side-nav.component.html',
	styleUrl: './side-nav.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent {
	readonly dialog = inject(MatDialog);
	readonly sidenavIsOpen = input<boolean>(true);
	readonly myLists = input.required<ToDoList[]>();
	readonly newList = output<{ id: string; title: string }>();
	showFiller = signal<boolean>(true);

	openDialog(): void {
		const openDialog = this.dialog.open(NewListComponent);

		openDialog.afterClosed().subscribe((data) => {
			if (data) {
				const randomId = generateRandomId();
				this.newList.emit({ id: randomId, ...data });
			}
		});
	}
}
