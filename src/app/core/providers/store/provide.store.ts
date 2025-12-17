import { makeEnvironmentProviders } from '@angular/core';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore as provideNgRx } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { environment } from '@app/enviromments/environment';
import { STORE_EFFECTS, STORE_REDUCERS, META_REDUCERS } from '@app/core/state/store.state';

export function provideStore() {
  return makeEnvironmentProviders([
    provideNgRx(STORE_REDUCERS, { metaReducers: META_REDUCERS }),
    provideEffects(...STORE_EFFECTS),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
      trace: !environment.production,
      traceLimit: 75,
      connectInZone: true
    })
  ]);
}
