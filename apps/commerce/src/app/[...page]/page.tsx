import { RenderBuilderContext } from '@/components/Builder';
import env from '@/sdk/env';
import { builder } from '@builder.io/sdk';

builder.init(env.NEXT_PUBLIC_BUILDER_API_KEY);

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Page(props: PageProps) {
  const content = await builder
    .get('page', {
      userAttributes: {
        urlPath: '/' + (props?.params?.page?.join('/') || '')
      },
      prerender: true
    })
    .toPromise();

  return <RenderBuilderContext content={content} />;
}
