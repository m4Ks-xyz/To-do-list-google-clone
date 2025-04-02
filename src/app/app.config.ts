import {
	ApplicationConfig,
	LOCALE_ID,
	provideZoneChangeDetection,
} from '@angular/core';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';

registerLocaleData(localePl);

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		{ provide: LOCALE_ID, useValue: 'pl' },
		{ provide: MAT_DATE_LOCALE, useValue: 'pl' },
	],
};
