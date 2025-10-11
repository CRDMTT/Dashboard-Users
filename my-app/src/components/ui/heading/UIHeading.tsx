import type { ReactNode } from 'react';
import '../../../assets/styles/ui/Heading.scss'

interface UIHeadingProps {
  level?: 1 | 2 | 3 ;
  children: ReactNode;
  className?: string;
}

export default function UIHeading({ level = 1, children, className = '' }: UIHeadingProps) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  
  return (
    <Tag className={`${className}`.trim()}>{children}</Tag>
  );
}
