import type { ReactNode } from 'react';
import { styled } from 'styled-components';

type CounterButtonTypes = 'increment' | 'decrement';

interface CounterButtonProps {
  type?: CounterButtonTypes;
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: ReactNode;
}

interface ButtonProps {
  type?: CounterButtonTypes;
  disabled?: boolean;
}

const Button = styled.button<ButtonProps>`
  background-color: ${({ type, disabled }) => {
    if (disabled) return '#b9bfbf';
    switch (type) {
      case 'decrement':
        return '#ec4068';
      default:
        return '#71c637';
    }
  }};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed;' : 'pointer')};
  font-size: 12px;

  &:hover {
    opacity: 0.9;
  }
`;

const CounterButton: React.FC<CounterButtonProps> = ({
  type = 'increment',
  disabled = false,
  onClick,
  children,
}) => {
  return (
    <Button type={type} onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  );
};

export default CounterButton;
