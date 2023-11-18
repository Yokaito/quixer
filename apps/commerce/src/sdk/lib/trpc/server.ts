import 'server-only'; // Make sure you can't import this on client

import { headers } from 'next/headers';
import { appRouter } from 'server';

export const api = appRouter.createCaller({
  headers: headers()
});
