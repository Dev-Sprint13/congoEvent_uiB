import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  isExternal?: boolean;
  className?: string;
  activeClassName?: string;
  isActive?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  to,
  children,
  isExternal = false,
  className = '',
  activeClassName = '',
  isActive = false,
  ...props
}) => {
  // In a real app, this would use React Router's Link or Next.js Link
  // For demo purposes, we're using a regular anchor tag
  const combinedClassName = isActive
    ? `${className} ${activeClassName}`
    : className;

  return isExternal ? (
    <a
      href={to}
      className={combinedClassName}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ) : (
    <a href={to} className={combinedClassName} {...props}>
      {children}
    </a>
  );
};