import { CREATE_SUBJECT_TEMPLATE,CREATING_SUBJECT,SUBJECT_CREATED,SUBJECT_LOADING,SUBJECT_LOADED,DELETING_SUBJECT,SUBJECT_DELETED,UPDATING_SUBJECT, SUBJECT_UPDATED } from './actionTypes';
import * as subjectApi from '../apis/subjectApi';
import { returnErrors, clearErrors } from './errorActions';
import { tokenConfig } from './authActions';



export const createSubjectTemplate = () =>async(dispatch,getState)=> {
  try {
    dispatch({type:CREATING_SUBJECT})
    const response = await subjectApi.createTemplate(tokenConfig(getState));
    dispatch(clearErrors());
    dispatch({ type: CREATE_SUBJECT_TEMPLATE, payload: response.data });
    dispatch({type:SUBJECT_CREATED})
  } catch (error) {
    await dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const getCurrentSemesterSubjects = () => async (dispatch, getState) => {
  const semester = getState().auth.user.currentSemester;
  try {
    dispatch({ type: SUBJECT_LOADING });
    const response = await subjectApi.getSubjectBySemester(semester, tokenConfig(getState));
    dispatch(clearErrors());
    await dispatch({ type: SUBJECT_LOADED, payload: response.data })
  } catch (error) {
    await dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const deleteSubject = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETING_SUBJECT });
    const response = await subjectApi.deleteSubject(tokenConfig(getState), id);
    dispatch({ type: SUBJECT_DELETED, payload: response.data });
  } catch (error) {
    await dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const updateSubject = (data, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATING_SUBJECT });
    const response = await subjectApi.updateSubject(tokenConfig(getState), data, id);
    await dispatch({ type: SUBJECT_UPDATED, payload: response.data })
  } catch (error) {
    await dispatch(returnErrors(error.response.data, error.response.status));
  }
};