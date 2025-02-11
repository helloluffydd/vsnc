import { ReactNode } from 'react';
import { styled } from 'styled-components';

interface TabProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

interface ButtonProps {
  $active: boolean;
}

const Button = styled.button<ButtonProps>`
  position: relative;
  z-index: ${({ $active }) => ($active ? 1 : 0)};
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ $active }) => ($active ? '#007AFF' : '#666')};
  background-color: ${({ $active }) => ($active ? 'white' : '#d2d2d2')};
  border: none;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
`;

const Tab: React.FC<TabProps> = ({ active, onClick, children }) => {
  return (
    <Button onClick={onClick} $active={active}>
      {children}
    </Button>
  );
};

export default Tab;
