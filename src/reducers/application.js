import { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, SET_DAYS } from "../constants/constants";

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

export default reducer;
