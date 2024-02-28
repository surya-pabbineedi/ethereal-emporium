import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { UserService } from '../services/user.service';
import { computed, inject } from '@angular/core';
import { EMPTY, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';

export type ProgressState = undefined | 'in-progress' | 'success' | 'error';

export type AppState = {
  isLoading: boolean;
  loginState: ProgressState;
  userToken?: string;
};

const defaultAppState: AppState = {
  isLoading: false,
  loginState: undefined,
};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState<AppState>(defaultAppState),
  withComputed(({ loginState }) => {
    return {
      isLoginInProgress: computed(() => loginState() === 'in-progress'),
      showAppToolbar: computed(() => loginState() === 'success'),
    };
  }),
  withMethods((store) => {
    // const userService = inject(UserService);
    const router = inject(Router);
    return {
      setLoading(isLoading: boolean) {
        patchState(store, { isLoading });
      },
      login(username: string, password: string) {
        patchState(store, { loginState: 'in-progress' });
        return EMPTY;
        // return userService.login(username, password).pipe(
        //   tap((response: { token: string }) => {
        //     patchState(store, {
        //       userToken: response.token,
        //       loginState: 'success',
        //     });

        //     localStorage.setItem('jwt_token', response.token);

        //     router.navigate(['/home']);
        //   }),
        //   catchError(() => {
        //     patchState(store, { loginState: 'error' });
        //     return EMPTY;
        //   })
        // );
      },
    };
  })
);
