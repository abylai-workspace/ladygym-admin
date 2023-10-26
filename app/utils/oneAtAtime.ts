export default function oneAtAtime<This, Args extends any[], Return>(
  ogMethod: (this: This, ...args: Args) => Promise<Return>,
) {
  const name = `oneAtAtime(${String(ogMethod.name)})`;
  let current: Promise<Return> | undefined;
  const wrap = {
    [name](this: This, ...args: Args) {
      if (current) {
        return current;
      }
      current = ogMethod.call(this, ...args).finally(() => {
        current = undefined;
      });
      return current;
    },
  };

  return wrap[name];
}
