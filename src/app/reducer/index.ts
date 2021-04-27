import { logger, errLogger } from './logger';
import { MetaReducer } from '@ngrx/store'
import { environment } from 'src/environments/environment';

export const metaReducers: MetaReducer<any>[] = !environment.production ? [errLogger, logger] : [];
