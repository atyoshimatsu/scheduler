import { useEffect, useReducer } from "react";
import axios from "axios";
import { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, SET_DAYS } from "../constants/constants";

const useApplicationData = () => {
  const reducer = (state, action) => {
    const presentDay = state.days.filter(day => day.appointments.includes(action.id))[0];
    const newDay = presentDay
      ? {
          ...presentDay,
          spots: Object.values(state.appointments).filter(
            appointment =>
              appointment.interview === null && presentDay.appointments.includes(appointment.id)
          ).length,
        }
      : {};
    const newDays = state.days.map(day => (day.id === newDay.id ? newDay : day));

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
            },
          },
        };
      case SET_DAYS:
        return {
          ...state,
          days: newDays,
        };
      default:
        throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
  ws.onmessage = e => {
    const data = JSON.parse(e.data);
    if (data.type === SET_INTERVIEW) {
      dispatch({
        type: SET_INTERVIEW,
        id: data.id,
        interview: data.interview ?? null,
      });
      dispatch({
        type: SET_DAYS,
        id: data.id,
      });
    }
  };

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

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    return (
      axios
        .put(`/api/appointments/${id}`, {
          ...appointment,
        })
        // eslint-disable-next-line
      .then(res => {
          dispatch({
            type: SET_INTERVIEW,
            id,
            interview: interview ?? null,
          });
          dispatch({
            type: SET_DAYS,
            id,
          });
        })
    );
  };

  const cancelInterview = id => {
    // eslint-disable-next-line
    return axios.delete(`/api/appointments/${id}`).then(res => {
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
