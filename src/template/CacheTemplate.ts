import Data from '../dto/data';

export default interface ICacheProvider {
  save(value: Data, prefix: string): Promise<void>;
  invalidate(key: string, prefix: string): Promise<void>;
  recover<T = unknown>(key: string, prefix: string): Promise<T | null>;
}
