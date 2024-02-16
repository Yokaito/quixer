import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';
import { forwardRef } from 'react';

type Props = LucideProps &
  React.SVGProps<SVGSVGElement> & {
    name: keyof typeof dynamicIconImports;
  };

export const Icon = forwardRef<SVGSVGElement, Props>(({ name, ...rest }, ref) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);

  return <LucideIcon ref={ref} {...rest} />;
});

Icon.displayName = 'Icon';
