import * as React from 'react';

const MockLink = ({ to, children }: { to: string | undefined, children: React.ReactElement | null}) => (
  <a href={to}>{children}</a>
);

export const Link = jest.fn().mockImplementation(MockLink);
