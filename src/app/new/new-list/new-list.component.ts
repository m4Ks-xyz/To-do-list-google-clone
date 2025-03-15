import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
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
	],
	templateUrl: './new-list.component.html',
	styleUrl: './new-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewListComponent {}
