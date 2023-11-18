import { api } from '@/sdk/lib/trpc/server';

export const PPRComponent = async () => {
  // add timeout to simulate slow network await api.hello.hello();
  const data = (): Promise<{
    greeting: string;
  }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(api.hello.hello());
      }, 3000);
    });
  };

  return <span>{(await data()).greeting} PPR Component Delay 1s</span>;
};

export default PPRComponent;
