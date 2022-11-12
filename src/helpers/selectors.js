export function getAppointmentsForDay(state, name) {
  const [dayInfo] = state.days.filter(day => day.name === name);

  if (!dayInfo) {
    return [];
  }

  return Object.values(state.appointments).filter(appointment => {
    return dayInfo.appointments.includes(appointment.id);
  });
}

export function getInterviewersForDay(state, name) {
  const [dayInfo] = state.days.filter(day => day.name === name);

  if (!dayInfo) {
    return [];
  }

  return Object.values(state.interviewers).filter(interviewer => {
    return dayInfo.interviewers.includes(interviewer.id);
  });
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const [interviewInfo] = Object.values(state.interviewers).filter(interviewer => interviewer.id === interview.interviewer);
  return {
    student: interview.student,
    interviewer: {
      ...interviewInfo,
    }
  };
}
