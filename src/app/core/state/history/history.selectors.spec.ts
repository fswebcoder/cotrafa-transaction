import { selectHistory, selectHistoryError, selectHistoryLoading, selectHistoryTotal } from './history.selectors';

describe('history selectors', () => {
  const rootState = {
    history: {
      history: [
        {
          id: 1,
          sourceAccount: { id: 1, accountNumber: '1', alias: 'A', balance: 100 },
          destinationAccount: { id: 2, accountNumber: '2', alias: 'B', balance: 200 },
          movement: 'SALIDA',
          amount: 10,
          cus: 'CUS',
          status: 'OK',
          timestamp: '2025-01-01T00:00:00Z'
        }
      ],
      totalElements: 1,
      loading: true,
      error: 'err'
    }
  };

  it('Debería seleccionar el historial', () => {
    expect(selectHistory(rootState as any)).toEqual(rootState.history.history);
  });

  it('Debería seleccionar totalElements', () => {
    expect(selectHistoryTotal(rootState as any)).toBe(1);
  });

  it('Debería seleccionar loading', () => {
    expect(selectHistoryLoading(rootState as any)).toBe(true);
  });

  it('Debería seleccionar error', () => {
    expect(selectHistoryError(rootState as any)).toBe('err');
  });
});

