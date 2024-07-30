declare module 'ioredis' {
    import { EventEmitter } from 'events';
  
    class Redis extends EventEmitter {
      constructor(options?: Redis.RedisOptions);
      get(key: string): Promise<string | null>;
      set(key: string, value: string, expiryMode?: string, time?: number): Promise<'OK'>;
      del(key: string): Promise<number>;
    }
  
    namespace Redis {
      interface RedisOptions {
        port?: number;
        host?: string;
        family?: number;
        password?: string;
        db?: number;
      }
    }
  
    export = Redis;
  }
  