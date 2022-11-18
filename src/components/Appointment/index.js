import React from 'react'
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';
import {
  EMPTY,
  SHOW,
  CREATE,
  EDIT,
  CONFIRM,
  SAVING,
  DELETING,
  ERROR_SAVE,
  ERROR_DELETE
} from '../../constants/constants';

function Appointment(props) {
  const {
    id,
    time,
    interview,
    interviewers,
    bookInterview,
    cancelInterview
  } = props;

  const { mode, transition, back} = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer, mode) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview, mode)
      .then(res => {
        transition(SHOW);
      })
      .catch(err => {
        transition(ERROR_SAVE, true);
      });
  }

  function remove() {
    transition(DELETING);
    cancelInterview(id)
      .then(res => {
        transition(EMPTY);
      })
      .catch(err => {
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW &&
        <Show
            student={interview.student}
            interviewer={interview.interviewer}
            onEdit={() => transition(EDIT)}
            onDelete={() => transition(CONFIRM)}
        />
      }
      {mode === CREATE &&
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
          mode={mode}
        />
      }
      {mode === EDIT &&
        <Form
          student={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
          mode={mode}
        />
      }
      {mode === CONFIRM &&
        <Confirm
          message={'Are you sure you would like to delete?'}
          onConfirm={remove}
          onCancel={() => back()}
        />
      }
      {mode === SAVING && <Status message={'Saving'} />}
      {mode === DELETING && <Status message={'Deleting'} />}
      {mode === ERROR_SAVE &&
        <Error
          message={'Cound not save the appointment'}
          onClose={() => transition(EMPTY)}
        />
      }
      {mode === ERROR_DELETE &&
        <Error
          message={'Cound not cancel the appointment'}
          onClose={() => transition(SHOW)}
        />
      }
    </article>
  );
}

export default Appointment;
