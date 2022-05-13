import Data from '../dto/data';
import SaveOptions from '../dto/saveOptions';

export default interface ICacheProvider {
  save(value: Data, prefix: string, options?: SaveOptions): Promise<void>;
  invalidate(key: string, prefix: string): Promise<void>;
  recover<T = unknown>(key: string, prefix: string): Promise<T | null>;
}
