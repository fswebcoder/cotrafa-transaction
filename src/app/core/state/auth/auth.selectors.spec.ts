import { selectIsAuthInitialized, selectIsLoading, selectLoginError, selectUser } from './auth.selectors';
import { IUser } from '@app/shared/entities/user.entity';

describe('auth selectors', () => {
  const user: IUser = {
    user_id: 1,
    user_name: 'Juan',
    last_name: 'Perez',
    document_type: 'CC',
    user_accounts: []
  };

  const rootState = {
    auth: {
      user,
      loading: true,
      error: 'err',
      isInitialized: false
    }
  };

  it('Debería seleccionar el usuario', () => {
    expect(selectUser(rootState as any)).toEqual(user);
  });

  it('Debería seleccionar loading', () => {
    expect(selectIsLoading(rootState as any)).toBe(true);
  });

  it('Debería seleccionar error', () => {
    expect(selectLoginError(rootState as any)).toBe('err');
  });

  it('Debería seleccionar isInitialized', () => {
    expect(selectIsAuthInitialized(rootState as any)).toBe(false);
  });
});

