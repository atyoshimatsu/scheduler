import React from 'react'
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

function Appointment(props) {
  const { mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const { id, time, interview } = props;
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW &&
        <Show
            student={interview.student}
            interviewer={interview.interviewer}
        />
      }
      {mode === CREATE &&
        <Form
          interviewers={[]}
          onSave={() => console.log('Clicked Save!')}
          onCancel={() => back(EMPTY)}
        />
      }
    </article>
  );
}

export default Appointment;
