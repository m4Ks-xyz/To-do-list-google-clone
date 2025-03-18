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
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
	selector: 'app-new-list',
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
	templateUrl: './new-list.component.html',
	styleUrl: './new-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewListComponent {
	readonly #fb = inject(FormBuilder);
	readonly dialogRef = inject(MatDialogRef);

	form = this.#fb.group({
		title: ['', Validators.required],
	});

	onSubmit(): void {
		this.form.markAllAsTouched();
		if (this.form.valid) {
			this.dialogRef.close(this.form.value);
		}
	}
}
