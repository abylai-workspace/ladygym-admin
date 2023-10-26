export default function isConstructor<T>(
    value: {(): T} | {new (): T},
  ): value is {new (): T} {
    if (value.prototype === undefined) {
      return false;
    }
  
    try {
      const proxy = new Proxy(value, {construct: () => ({})}) as {new (): T};
      // eslint-disable-next-line no-new
      new proxy();
      return true;
    } catch (err) {
      return false;
    }
  }
  