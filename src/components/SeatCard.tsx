import styled from 'styled-components';
import Counter from './Counter';

interface SeatCardProps {
  order: string;
  name: string;
  active: boolean;
  count: number;
}

const Header = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`;

const Body = styled.div`
  padding: 12px;
  font-size: 24px;
  font-weight: 600;
  color: black;
  text-align: center;
`;

const Footer = styled.div`
  padding: 2px;
`;

const getActiveColor = (active: boolean) => (active ? '#0d82ec' : '#bcc0c1');

interface ContainerProps {
  $active: boolean;
}

const Container = styled.div<ContainerProps>`
  background-color: white;
  color: white;
  border: 1px solid ${({ $active }) => getActiveColor($active)};
  border-radius: 4px;
  width: 120px;
  overflow: hidden;

  ${Header} {
    background-color: ${({ $active }) => getActiveColor($active)};
  }

  ${Body} {
    color: ${({ $active }) => ($active ? '#000' : '#bcc0c1')};
  }

  ${Footer} {
    border-top: 1px solid ${({ $active }) => getActiveColor($active)};
  }
`;

const SeatCard: React.FC<SeatCardProps> = ({
  order,
  name = 'Guest',
  active = false,
  count = 0,
}) => {
  return (
    <Container $active={active}>
      <Header>{order}</Header>
      <Body>{name}</Body>
      <Footer>
        <Counter count={count} active={active} />
      </Footer>
    </Container>
  );
};

export default SeatCard;
