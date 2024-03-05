import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { UserService } from '../services/user.service';
import { computed, inject } from '@angular/core';
import { EMPTY, catchError, map, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationHubService } from '../services/notification-hub.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type ProgressState = undefined | 'in-progress' | 'success' | 'error';

export type AppState = {
  isLoading: boolean;
  loginState: ProgressState;
  loginResponse?: {
    accessToken: string;
  };
};

const defaultAppState: AppState = {
  isLoading: false,
  loginState: undefined,
};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState<AppState>(defaultAppState),
  withComputed(({ loginState }) => {
    const activatedRoute = inject(ActivatedRoute);
    return {
      isLoginInProgress: computed(() => loginState() === 'in-progress'),
      showAppToolbar: computed(() => {
        return activatedRoute.url.pipe(
          map(
            (entry) =>
              !entry.join('').endsWith('login') && loginState() === 'success'
          )
        );
      }),
      isAuthenticated: computed(() => loginState() === 'success'),
    };
  }),
  withHooks((store) => {
    const router = inject(Router);
    const notificationService = inject(NotificationHubService);
    return {
      onInit: () => {
        notificationService.init();
        const accessToken = sessionStorage.getItem('user_access_token');

        if (accessToken) {
          patchState(store, {
            loginResponse: {
              accessToken,
            },
            loginState: 'success',
          });

          router.navigate(['/products']);
        }
      },
    };
  }),
  withMethods((store) => {
    const userService = inject(UserService);
    const router = inject(Router);
    const notificationService = inject(NotificationHubService);

    return {
      setLoading(isLoading: boolean) {
        patchState(store, { isLoading });
      },
      login(email: string, password: string) {
        patchState(store, { loginState: 'in-progress' });
        return userService.login(email, password).pipe(
          tap((response: { accessToken: string }) => {
            console.log({ response });
            patchState(store, {
              loginResponse: response,
              loginState: 'success',
            });

            sessionStorage.setItem('user_access_token', response.accessToken);
            notificationService.init();
            router.navigate(['/home']);
          }),
          catchError(() => {
            patchState(store, { loginState: 'error' });
            return EMPTY;
          })
        );
      },
    };
  })
);
