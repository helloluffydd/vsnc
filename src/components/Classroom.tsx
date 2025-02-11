import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { EllipsisVertical, User } from 'lucide-react';

import Tab from './Tab';
import SeatCard from './SeatCard';
import Tooltip from './Tooltip';
import Group from './Group';

import { selectCourseById } from '../features/courseSlice';

import { RootState } from '../store/store';
import { groupBy } from '../utils/groupBy';
import { normalizeBy } from '../utils/normalizeBy';

interface ClassroomProps {
  id: string;
}

const Container = styled.div`
  padding-top: 24px;
  background-color: #f4f4f4;
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 36px;
  margin: 16px 0;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 900;
`;

const StudentQuota = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 18px;
  font-weight: 700;
`;

const Navigator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 8px;

  & button {
    min-width: 100px;
  }
`;

const Body = styled.div`
  padding: 24px 8px 24px 36px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px -1px 6px 0px #bfbfbf;
  position: relative;
  z-index: 0;
`;

const ScrollableSection = styled.div`
  max-height: 520px;
  overflow-y: scroll;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  justify-items: center;
  margin-right: 20px;
`;

const tabs: { key: 'list' | 'group'; label: string }[] = [
  { key: 'list', label: 'Student List' },
  { key: 'group', label: 'Group' },
];

const Classroom: React.FC<ClassroomProps> = ({ id }) => {
  const [activeTab, setActiveTab] = useState<'list' | 'group'>('list');
  const course = useSelector((state: RootState) => selectCourseById(state, id));
  const { title, code, quota, students } = course;

  const { map: sByOrder } = useMemo(
    () => normalizeBy(students, 'order'),
    [students]
  );
  const groups = useMemo(() => groupBy(students, (s) => s.inGroup), [students]);

  return (
    <Container>
      <Header>
        <Title>
          {code} {title}
        </Title>
        <StudentQuota>
          <User size={18} strokeWidth={3} />
          {students.length}/{quota}
        </StudentQuota>
      </Header>
      <Navigator>
        <TabContainer>
          {tabs.map(({ key, label }) => (
            <Tab
              key={key}
              active={activeTab === key}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </Tab>
          ))}
        </TabContainer>
        <Tooltip
          content="Make sure all students join the class."
          position="top"
        >
          <EllipsisVertical size={20} strokeWidth={3} />
        </Tooltip>
      </Navigator>
      <Body>
        <ScrollableSection>
          {activeTab === 'list' && (
            <Grid>
              {Array.from({ length: quota }, (_, i) => i + 1).map((order) => (
                <SeatCard
                  key={order}
                  order={`${order}`.padStart(2, '0')}
                  name={sByOrder[order]?.name}
                  count={sByOrder[order]?.count}
                  active={!!sByOrder[order]}
                />
              ))}
            </Grid>
          )}

          {activeTab === 'group' &&
            Object.keys(groups).map((title) => (
              <Group key={title} title={title}>
                <Grid>
                  {groups[title].map(({ order, name, count }) => (
                    <SeatCard
                      key={order}
                      order={`${order}`.padStart(2, '0')}
                      name={name}
                      active={true}
                      count={count}
                    />
                  ))}
                </Grid>
              </Group>
            ))}
        </ScrollableSection>
      </Body>
    </Container>
  );
};

export default Classroom;
