import { useState, useEffect } from 'react'
import axios from "axios";
import { CREATE } from '../constants/constants'

function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview, mode) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayIndex = state.days.map(day => day.name).indexOf(state.day);
    const newDay = {
      ...state.days[dayIndex],
      spots: mode === CREATE ? state.days[dayIndex].spots - 1 : state.days[dayIndex].spots,
    }
    const newDays = state.days.map(day => {
      if(day.id === newDay.id) {
        return newDay;
      }
      return day;
    })
    console.log(dayIndex, newDay, newDays);
    return axios.put(`/api/appointments/${id}`, {
      ...appointment
    })
      .then(res => {
        setState({
          ...state,
          days: newDays,
          appointments
        });
      });
  }

  function cancelInterview(id) {
    const dayIndex = state.days.map(day => day.name).indexOf(state.day);
    const newDay = {
      ...state.days[dayIndex],
      spots: state.days[dayIndex].spots + 1,
    }
    const newDays = state.days.map(day => {
      if(day.id === newDay.id) {
        return newDay;
      }
      return day;
    })

    return axios.delete(`/api/appointments/${id}`)
      .then(res => {
        setState({
          ...state,
          days: newDays,
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

