import { useEffect, useReducer } from "react";
import axios from "axios";
import { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, SET_DAYS } from "../constants/constants";
import reducer from "reducers/application";
import useAutoUpdate from "./useAutoUpdate";

/**
 * @returns {Object} state
 * @returns {dispatch} setDay
 * @returns {Function} bookInterview
 * @returns {Function} cancelInterview
 */
const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });
    });
  }, []);

  useAutoUpdate(dispatch);

  /**
   * @param {number} id
   * @param {Object} interview
   * @returns {Promise} Try to put an appointment into the DB
   */
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    return axios
      .put(`/api/appointments/${id}`, {
        ...appointment,
      })
      .then(() => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview: interview ?? null,
        });
        dispatch({
          type: SET_DAYS,
          id,
        });
      });
  };

  /**
   * @param {number} id
   * @returns {Promise} Try to delete an appointment from the DB
   */
  const cancelInterview = id => {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview: null,
      });
      dispatch({
        type: SET_DAYS,
        id,
      });
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
};

export default useApplicationData;
