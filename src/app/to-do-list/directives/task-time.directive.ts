import { computed, Directive, input, signal, OnDestroy } from '@angular/core';
import { calculateTimeDifference } from '../../utils/calculate-time-difference.util';
import { TimeUnit } from '../../utils/time-unit.enum';

@Directive({
	selector: '[app-task-time]',
	host: {
		'[style.color]': 'color()',
	},
})
export class TaskTimeDirective implements OnDestroy {
	readonly taskTime = input.required<string>();

	readonly now = signal(new Date());
	readonly intervalId = setInterval(() => {
		this.now.set(new Date());
	}, TimeUnit.MINUTE);

	readonly color = computed(() => {
		const taskTimeDate = new Date(this.taskTime());
		const timeDifference = calculateTimeDifference(taskTimeDate, this.now());

		if (timeDifference.isNegative) {
			return '#eb4034';
		} else if (timeDifference.days === 0 && timeDifference.hours < 24) {
			return '#ff8080';
		} else if (timeDifference.days <= 3) {
			return '#f5f376';
		}
		return '';
	});

	ngOnDestroy(): void {
		clearInterval(this.intervalId);
	}
}
