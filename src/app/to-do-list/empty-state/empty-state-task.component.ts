import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-empty-state',
	imports: [],
	template: `
		<div class="task-list__empty-state">
			<div class="task-list__empty-state__img">
				<ng-content select="[app-empty-state-img]"></ng-content>
			</div>

			<h3 class="task-list__empty-state__title">
				<ng-content select="[app-empty-state-title]" />
			</h3>

			<p class="task-list__empty-state__description">
				<ng-content select="[app-empty-state-description]" />
			</p>
		</div>
	`,
	styleUrl: './empty-state-task.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {}
