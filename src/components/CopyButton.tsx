import { useCallback, type ReactNode } from 'react';
import { styled } from 'styled-components';
import { Copy } from 'lucide-react';

interface CopyButtonProps {
  children: ReactNode;
  value: string;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 4px;
  color: #fff;
  background-color: #0d82ec;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CopyButton: React.FC<CopyButtonProps> = ({ value, children }) => {
  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        alert(`Copied successfully!`);
      })
      .catch((_) => {
        alert(`Copied successfully!`);
      });
  }, [value]);

  return (
    <Container>
      {children}
      <Button onClick={handleCopy}>
        <Copy size={16} />
      </Button>
    </Container>
  );
};

export default CopyButton;
