import { AuthActions } from './auth.actions';
import { authReducer, initialState } from './auth.reducer';
import { IUser } from '@app/shared/entities/user.entity';

describe('authReducer', () => {
  const user: IUser = {
    user_id: 1,
    user_name: 'Juan',
    last_name: 'Perez',
    document_type: 'CC',
    document_number: '123',
    user_accounts: [],
    token: 'token'
  };

  it('Debería devolver el estado inicial para una acción desconocida', () => {
    const state = authReducer(undefined, { type: 'UNKNOWN' } as any);
    expect(state).toEqual(initialState);
  });

  it('Debería establecer loading en true en login', () => {
    const state = authReducer(initialState, AuthActions.login({ loginDto: { username: 'u', password: 'p' } }));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Debería establecer el usuario en loginSuccess', () => {
    const state = authReducer(
      { ...initialState, loading: true },
      AuthActions.loginSuccess({ user })
    );
    expect(state.user).toEqual(user);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('Debería establecer error en loginFailure', () => {
    const state = authReducer(
      { ...initialState, loading: true },
      AuthActions.loginFailure({ error: 'Credenciales inválidas' })
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Credenciales inválidas');
  });

  it('Debería establecer isInitialized en true en checkAuthComplete', () => {
    const state = authReducer(
      { ...initialState, loading: true },
      AuthActions.checkAuthComplete()
    );
    expect(state.loading).toBe(false);
    expect(state.isInitialized).toBe(true);
  });

  it('Debería eliminar el usuario en logout', () => {
    const state = authReducer(
      { ...initialState, user, loading: true, error: 'x' },
      AuthActions.logout()
    );
    expect(state.user).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });
});

