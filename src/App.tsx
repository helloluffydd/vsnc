import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';

import DynamicContent from './components/DynamicContent';
import Modal from './components/Modal';
import JoinClassroom from './components/JoinClassroom';
import Classroom from './components/Classroom';

import {
  fetchCourseById,
  selectStatus,
  selectError,
} from './features/courseSlice';

const GlobalStyles = createGlobalStyle`
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
  }

  ::-webkit-scrollbar {
    width: 8px;
    background-color: #fff;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #777;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  height: 100vh;
  color: #000;
  background-color: #707070;
`;

const EXAMPLE_COURSE_ID = 'X58E9647';

function App() {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    if (status === 'IDLE') dispatch(fetchCourseById(EXAMPLE_COURSE_ID) as any);
  }, [status, dispatch]);

  return (
    <Container>
      <GlobalStyles />
      <DynamicContent status={status} message={error}>
        <Modal>
          <JoinClassroom id={EXAMPLE_COURSE_ID} />
        </Modal>
        <Modal>
          <Classroom id={EXAMPLE_COURSE_ID} />
        </Modal>
      </DynamicContent>
    </Container>
  );
}

export default App;
