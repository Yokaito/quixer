'use client';

import { api } from '@/sdk/lib/trpc/react';

export const ClientComponent = () => {
  const { data, isLoading } = api.hello.hello.useQuery();

  return (
    <>
      {isLoading ? (
        <div>Loading Client Component...</div>
      ) : (
        <span>{data?.greeting} Client Component</span>
      )}
    </>
  );
};

export default ClientComponent;
