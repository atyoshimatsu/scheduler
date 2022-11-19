import { useEffect, useReducer } from 'react'
import axios from "axios";
import {
  CREATE,
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_SPOTS,
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
        return {
          ...state,
          appointments: {
            ...state.appointments,
            [action.id]: {
              ...state.appointments[action.id],
              interview: action.interview,
            }
          }
        };
      case SET_SPOTS:
        const dayIndex = state.days.map(day => day.name).indexOf(state.day);
        const newDay = {
          ...state.days[dayIndex],
          spots: action.mode === CREATE ? state.days[dayIndex].spots - 1 : state.days[dayIndex].spots + 1,
        };
        const newDays = state.days.map(day => day.id === newDay.id ? newDay : day);

        return {
          ...state,
          days: newDays,
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
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, {
      ...appointment
    })
      .then(res => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: state.days,
          appointments,
          interviewers: state.interviewers,
        });
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview,
        });
        if (mode === CREATE) {
          dispatch({
            type: SET_SPOTS,
            mode: CREATE,
          });
        }
      });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(res => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview: null,
        });
        dispatch({
          type: SET_SPOTS,
        });
      });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}

export default useApplicationData;

