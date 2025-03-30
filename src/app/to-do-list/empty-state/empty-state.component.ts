import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
	selector: 'app-empty-state',
	imports: [],
	templateUrl: './empty-state.component.html',
	styleUrl: './empty-state.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
	emptyStateMode = input.required<'task' | 'favorite-tasks'>();
}
