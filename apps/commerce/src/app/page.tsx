import { api } from '@/sdk/lib/trpc/server';
import { ClientComponent } from './client-component';
import { PPRComponent } from './ppr-component';

export default async function HomePage() {
  const hello = await api.hello.hello();

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <span>{hello.greeting} Server Component</span>
      <ClientComponent />
      <PPRComponent />
    </div>
  );
}
