import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { ToDoList } from './models/to-do-list.model';

@Component({
	selector: 'app-to-do-list',
	imports: [
		MatButtonModule,
		MatDividerModule,
		MatIconModule,
		MatRadioModule,
		MatMenuModule,
	],
	templateUrl: './to-do-list.component.html',
	styleUrl: './to-do-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListComponent {
	readonly toDoLists = input.required<ToDoList[]>();
}
