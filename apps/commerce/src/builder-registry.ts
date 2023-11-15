'use client';

import { Builder } from '@builder.io/react';
import dynamic from 'next/dynamic';

Builder.registerComponent(
  dynamic(() => import('./components/Counter')),
  {
    name: 'Counter',
    inputs: [
      {
        name: 'initialCount',
        type: 'number'
      }
    ]
  }
);
