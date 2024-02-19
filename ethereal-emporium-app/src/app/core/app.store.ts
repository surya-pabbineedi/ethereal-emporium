import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export type AppState = {
    isLoading: boolean;
};

export const AppStore = signalStore(
  withState<AppState>({ isLoading: false }),
  withMethods((store) => {
    return {
      setLoading(isLoading: boolean) {
        patchState(store, { isLoading });
      },
    };
  })
);
