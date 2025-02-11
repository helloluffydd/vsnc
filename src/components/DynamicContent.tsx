import { Fragment, type ReactNode } from 'react';
import { styled } from 'styled-components';
import { type AsyncStatus } from '../types/Async';

interface DynamicContentProps {
  status: AsyncStatus;
  message?: string;
  fallback?: ReactNode;
  children: ReactNode;
}

const Hint = styled.div`
  font-size: 24px;
  font-weight: 900;
  color: #fff;
`;

const DynamicContent: React.FC<DynamicContentProps> = ({
  status = 'IDLE',
  message = 'Something went wrong!',
  fallback = <Hint>'Hello World!'</Hint>,
  children,
}) => {
  if (status === 'LOADING') {
    return <Hint>Loading...</Hint>;
  }

  if (status === 'FAILED') {
    return <Hint>{message}</Hint>;
  }

  if (status === 'SUCCEEDED') {
    return <Fragment>{children}</Fragment>;
  }

  return <Fragment>{fallback}</Fragment>;
};

export default DynamicContent;
