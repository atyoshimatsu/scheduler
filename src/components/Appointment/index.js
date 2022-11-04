import React from 'react'
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

function Appointment(props) {
  const { id, time, interview } = props;
  return (
    <article className="appointment">
      <Header time={time} />
      {interview
        ? <Show
            student={interview.student}
            interviewer={interview.interviewer}
          />
        : <Empty />
      }
    </article>
  );
}

export default Appointment;
