import { computed, Directive, input, signal } from '@angular/core';
import { calculateTimeDifference } from '../../../utils/calculate-time-difference.util';

@Directive({
	selector: '[app-task-time]',
	host: {
		'[style.color]': 'color()',
	},
})
export class TaskTimeDirective {
	taskTime = input.required<string>();

	color = computed(() => {
		const taskTimeDate = new Date(this.taskTime());
		const timeDifference = calculateTimeDifference(taskTimeDate, new Date());

		if (timeDifference.isNegative) {
			return '#eb4034';
		} else if (timeDifference.days <= 1) {
			return '#ff8080';
		} else if (timeDifference.days <= 3) {
			return '#f5f376';
		}
		return '';
	});
}
