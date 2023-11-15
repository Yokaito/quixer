'use client';

import env from '@/sdk/env';
import { BuilderComponent, useIsPreviewing } from '@builder.io/react';
import { BuilderContent, builder } from '@builder.io/sdk';
import DefaultErrorPage from 'next/error';
import '../../builder-registry';

interface BuilderPageProps {
  content?: BuilderContent;
}

builder.init(env.NEXT_PUBLIC_BUILDER_API_KEY);

export function RenderBuilderContext({ content }: BuilderPageProps) {
  const isPreviewing = useIsPreviewing();

  if (content || isPreviewing) {
    return <BuilderComponent content={content} model="page" />;
  }

  return <DefaultErrorPage statusCode={404} />;
}
