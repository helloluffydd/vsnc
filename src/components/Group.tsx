import { ReactNode } from 'react';
import styled from 'styled-components';

interface GroupProps {
  title: string;
  children: ReactNode;
}

const Container = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-left: 10px;
  margin-bottom: 6px;
`;

const Group: React.FC<GroupProps> = ({ title, children }) => {
  return (
    <Container>
      <Title>Group {title}</Title>
      {children}
    </Container>
  );
};

export default Group;
