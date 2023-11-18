import { getApiCaller } from '@/sdk/lib/trpc/server';
import { Suspense } from 'react';
import { ClientComponent } from './client-component';
import { PPRComponent } from './ppr-component';

export default async function HomePage() {
  const hello = await getApiCaller().hello.hello();

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <span>{hello.greeting} Server Component</span>
      <ClientComponent />
      <Suspense fallback={<div>Loading PPR Component...</div>}>
        <PPRComponent />
      </Suspense>
    </div>
  );
}
