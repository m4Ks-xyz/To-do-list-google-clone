import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideNavComponent } from './nav-bar/side-nav/side-nav.component';
import { ToDoListComponent } from './to-do-list/to-do-list/to-do-list.component';
import { ToDoListService } from './to-do-list/to-do-list/services/to-do-list.service';
import { ToDoList } from './to-do-list/to-do-list/models/to-do-list.model';
import { NewListComponent } from './new/new-list/new-list.component';

@Component({
	selector: 'app-root',
	imports: [
		NavBarComponent,
		SideNavComponent,
		ToDoListComponent,
		NewListComponent,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	readonly #toDoListService = inject(ToDoListService);
	readonly allLists: ToDoList[] = this.#toDoListService.getLists();

	sideNavState = signal(true);
	addListState = signal(false);
}
