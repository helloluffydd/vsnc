import { useCallback, useState } from 'react';
import { styled } from 'styled-components';

interface CounterProps {
  count: number;
  active: boolean;
}

interface ContainerProps {
  $active: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
`;

const Count = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

interface ButtonProps {
  type?: 'increment' | 'decrement';
  disabled?: boolean;
}

const Button = styled.button<ButtonProps>`
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed;' : 'pointer')};
  background-color: ${({ type, disabled }) => {
    if (disabled) return '#b9bfbf';
    switch (type) {
      case 'decrement':
        return '#ec4068';
      default:
        return '#71c637';
    }
  }};

  &:hover {
    opacity: 0.9;
  }
`;

const Counter: React.FC<CounterProps> = ({ count = 0, active = false }) => {
  const [counter, setCounter] = useState(count);

  const handleDecrement = useCallback(() => {
    setCounter((prev) => prev - 1);
  }, [setCounter]);

  const handleIncrement = useCallback(() => {
    setCounter((prev) => prev + 1);
  }, [setCounter]);

  return (
    <Container $active={active}>
      <Button
        type="decrement"
        onClick={handleDecrement}
        disabled={!active || counter <= 0}
      >
        -1
      </Button>
      <Count>{counter}</Count>
      <Button type="increment" onClick={handleIncrement} disabled={!active}>
        +1
      </Button>
    </Container>
  );
};

export default Counter;
