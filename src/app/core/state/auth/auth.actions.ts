import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from '@app/shared/entities/user.entity';
import { LoginDto } from '@app/feature/auth/domain/dtos/login.dto';

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Login': props<{ loginDto: LoginDto }>(),
        'Login Success': props<{ user: IUser }>(),
        'Restore Session Success': props<{ user: IUser }>(),
        'Update User': props<{ user: IUser }>(),
        'Update User Failure': props<{ error: string }>(),
        'Login Failure': props<{ error: string }>(),
        'Check Auth': emptyProps(),
        'Check Auth Complete': emptyProps(),
             'Logout': emptyProps(),
    }
});
