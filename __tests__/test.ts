import { FakeCacheProvider, Data } from '../src/index';

let fakeCacheProvider: FakeCacheProvider;

describe('Tests', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
  });
  it('should be abble to add and recover value', async () => {
    const data: Data<number> = {
      key: 'test',
      data: 1,
    };

    await fakeCacheProvider.save(data, 'app:');

    const dataRecovered = await fakeCacheProvider.recover<number>(
      'test',
      'app:'
    );

    expect(dataRecovered).toBe(1);
  });

  it('should invalidate key', async () => {
    const data: Data<number> = {
      key: 'test',
      data: 1,
    };

    await fakeCacheProvider.save(data, 'app:');

    const dataRecovered = await fakeCacheProvider.recover<number>(
      'test',
      'app:'
    );

    expect(dataRecovered).toBe(1);

    await fakeCacheProvider.invalidate('test', 'app:');

    const dataRecovered2 = await fakeCacheProvider.recover<number>(
      'test',
      'app:'
    );

    expect(dataRecovered2).toBe(null);
  });

  it('should be able to remove value after some time', async () => {
    const data: Data<number> = {
      key: 'test',
      data: 1,
    };

    jest.useFakeTimers();

    fakeCacheProvider.save(data, 'app:', { ttlInSeconds: 3 });

    const dataRecovered = await fakeCacheProvider.recover<number>(
      'test',
      'app:'
    );

    expect(dataRecovered).toBe(1);

    jest.runAllTimers();

    const newDataRecovered = await fakeCacheProvider.recover<number>(
      'test',
      'app:'
    );

    expect(newDataRecovered).toBe(null);
  });
});
