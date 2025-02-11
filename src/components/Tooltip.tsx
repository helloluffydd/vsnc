import { ReactNode, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

interface TooltipProps {
  position: TooltipPosition;
  content: ReactNode;
  children: ReactNode;
}

const Button = styled.button`
  display: inline-block;
  position: relative;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #666;
`;

const positionStyles = {
  top: {
    body: `bottom: 100%; left: 50%; margin-bottom: 5px; transform: translateX(-50%) translateY(-10px); `,
    arrow: `top: 100%; left: 50%; border-top-color: #333; transform: translateX(-50%);`,
  },
  right: {
    body: `left: 100%; top: 50%; margin-left: 5px; transform: translateY(-50%) translateX(10px);`,
    arrow: `right: 100%; top: 50%; border-right-color: #333; transform: translateY(-50%);`,
  },
  bottom: {
    body: `top: 100%; left: 50%; margin-top: 5px; transform: translateX(-50%) translateY(10px);`,
    arrow: `bottom: 100%; left: 50%; border-bottom-color: #333; transform: translateX(-50%);`,
  },
  left: {
    body: `right: 100%; top: 50%; margin-right: 5px; transform: translateY(-50%) translateX(-10px);`,
    arrow: `left: 100%; top: 50%; border-left-color: #333; transform: translateY(-50%);`,
  },
};

const Content = styled.div<{
  $position: TooltipPosition;
  $isVisible: boolean;
}>`
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: all 0.2s ease-in-out;

  ${({ $position }) => positionStyles[$position].body}

  &::before {
    content: '';
    position: absolute;
    border: 5px solid transparent;
    ${({ $position }) => positionStyles[$position].arrow}
  }
`;

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  return (
    <Button onClick={() => setIsVisible(true)} ref={tooltipRef}>
      {children}
      <Content $position={position} $isVisible={isVisible}>
        {content}
      </Content>
    </Button>
  );
};

export default Tooltip;
