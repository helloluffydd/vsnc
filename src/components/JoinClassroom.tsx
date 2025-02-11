import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ChevronLeft } from 'lucide-react';

import CopyButton from './CopyButton';
import QRCode from './QRCode';

import { selectCourseEntities } from '../features/courseSlice';

interface JoinClassroomProps {
  id: string;
}

const Container = styled.div`
  padding: 24px;
  background-color: #f4f4f4;
  border-radius: 8px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 0;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #333;
  background-color: #f4f4f4;
  border: none;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 14px;
`;

const CopyButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 700;
  color: #333;
`;

const QRCodeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px;
  border-radius: 8px;
  overflow: hidden;
`;

const Version = styled.div`
  text-align: center;
  color: #333;
  font-size: 12px;
  font-weight: 500;
  margin-top: 10px;
`;

const JoinClassroom: React.FC<JoinClassroomProps> = ({ id }) => {
  const courseEntities = useSelector(selectCourseEntities);
  const { code = '', title = '', link = '' } = courseEntities[id] ?? {};

  return (
    <Container>
      <BackButton>
        <ChevronLeft size={16} /> Back to Class List
      </BackButton>
      <Title>
        Join {code} {title}
      </Title>
      <CopyButtonContainer>
        <CopyButton value={id}>ID: {id}</CopyButton>
        <CopyButton value={link}>Link</CopyButton>
      </CopyButtonContainer>
      <QRCodeContainer>
        <QRCode link={link}></QRCode>
      </QRCodeContainer>
      <Version>Version 1.1.7</Version>
    </Container>
  );
};

export default JoinClassroom;
