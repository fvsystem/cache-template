import Data from '../dto/data';
import CacheTemplate from '../template/CacheTemplate';
import SaveOptions from '../dto/saveOptions';

export default class FakeCacheProvider implements CacheTemplate {
  cache: Map<string, unknown>;

  constructor() {
    this.cache = new Map<string, unknown>();
  }

  async save(
    value: Data,
    prefix: string,
    options?: SaveOptions
  ): Promise<void> {
    this.cache.set(`${prefix}${value.key}`, value.data);
    if (options?.ttlInSeconds) {
      setTimeout(() => {
        this.invalidate(value.key, prefix);
      }, options.ttlInSeconds * 1000);
    }
  }

  async invalidate(key: string, prefix: string): Promise<void> {
    this.cache.delete(`${prefix}${key}`);
  }

  async recover<T = unknown>(key: string, prefix: string): Promise<T | null> {
    if (!this.cache.get(`${prefix}${key}`)) {
      return null;
    }

    return this.cache.get(`${prefix}${key}`) as T;
  }
}
