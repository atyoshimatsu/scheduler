import React from 'react'
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";

function Appointment(props) {
  const { mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const { id, time, interview, interviewers, bookInterview } = props;

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview).then(res => {
      transition(SHOW);
    });
  }

  function remove(id) {
    console.log(id);
    transition(DELETING);
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW &&
        <Show
            id={id}
            student={interview.student}
            interviewer={interview.interviewer}
            onDelete={remove}
        />
      }
      {mode === CREATE &&
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back(EMPTY)}
        />
      }
      {mode === SAVING && <Status message={'Saving'} />}
      {mode === DELETING && <Status message={'Deleting'} />}
    </article>
  );
}

export default Appointment;
