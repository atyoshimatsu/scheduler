export function getAppointmentsForDay(state, name) {
  const [dayInfo] = state.days.filter(day => day.name === name);

  if (!dayInfo) {
    return [];
  }

  return Object.values(state.appointments).filter(a => {
    return dayInfo.appointments.includes(a.id);
  });
}
