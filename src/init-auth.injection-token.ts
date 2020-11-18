import { InjectionToken } from '@angular/core';

export interface InitAuth {
    username: string,
    accessToken: string
}

export const INIT_AUTH = new InjectionToken<InitAuth>('app.init-auth');