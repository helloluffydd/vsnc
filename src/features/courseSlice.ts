import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { type RootState } from '../store/store';
import { type AsyncState } from '../types/Async';

interface Course {
  id: string;
  code: string;
  title: string;
  quota: number;
  students: Student[];
  link: string;
}

export interface Student {
  id: string;
  name: string;
  order: number;
  count: number;
  inGroup: string;
}

export const fetchCourseById = createAsyncThunk(
  'course/fetchCourseById',
  async (id: string, thunkAPI) => {
    try {
      const response = await fetch(`/api/course/${id}.json`);

      if (!response.ok) {
        thunkAPI.rejectWithValue(`Failed to fetch course with id: ${id}`);
      }

      return (await response.json()) as Course;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return 'Something went wrong!';
    }
  }
);

const courseAdapter = createEntityAdapter<Course, string>({
  selectId: (course) => course.id,
});

interface CourseState extends AsyncState {}

const initialState = courseAdapter.getInitialState<CourseState>({
  status: 'IDLE',
  error: '',
});

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseById.pending, (state) => {
        state.status = 'LOADING';
        state.error = '';
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.status = 'SUCCEEDED';
        courseAdapter.addOne(state, action.payload as Course);
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const {
  selectById: selectCourseById,
  selectEntities: selectCourseEntities,
} = courseAdapter.getSelectors((state: RootState) => state.course);

export const selectStatus = (state: RootState) => state.course.status;
export const selectError = (state: RootState) => state.course.error;

export default courseSlice.reducer;
