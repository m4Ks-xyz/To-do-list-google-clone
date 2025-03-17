import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
	FormBuilder,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
	selector: 'app-new-task',
	providers: [provideNativeDateAdapter()],
	imports: [
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatButtonModule,
		MatDialogModule,
		ReactiveFormsModule,
	],
	templateUrl: './new-task.component.html',
	styleUrl: './new-task.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTaskComponent {
	readonly #fb = inject(FormBuilder);

	form = this.#fb.group({
		title: ['', Validators.required],
		description: ['', Validators.required],
	});
}
