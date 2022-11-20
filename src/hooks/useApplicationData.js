import { useEffect, useReducer } from 'react'
import axios from "axios";
import {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from '../constants/constants';

function useApplicationData() {
  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          day: action.day,
        };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        };
      case SET_INTERVIEW:
        const presntDay = state.days.filter(day => day.appointments.includes(action.id))[0];
        const newDay = {
          ...presntDay,
          spots: action.interview ? presntDay.spots - 1 : presntDay.spots + 1,
        };
        const newDays = state.days.map(day => day.id === newDay.id ? newDay : day);

        return {
          ...state,
          days: newDays,
          appointments: {
            ...state.appointments,
            [action.id]: {
              ...state.appointments[action.id],
              interview: action.interview,
            }
          }
        };
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === SET_INTERVIEW) {
        dispatch({
          type: SET_INTERVIEW,
          id: data.id,
          interview: data.interview ?? null,
        });
      }
    };

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });
    });
  }, []);

  function bookInterview(id, interview, mode) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return axios.put(`/api/appointments/${id}`, {
      ...appointment
    });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`);
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}

export default useApplicationData;

