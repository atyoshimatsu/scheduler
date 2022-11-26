import React, { useState, useEffect } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

const Form = props => {
  const { interviewers, onSave, onCancel } = props;
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [studentValidation, setstudentValidation] = useState("");
  const [interviewerValidation, setinterviewerValidation] = useState("");

  useEffect(() => {
    setstudentValidation(!student ? "Student name cannot be blank" : "");
  }, [student]);

  useEffect(() => {
    setinterviewerValidation(!interviewer ? "please select an interviewer" : "");
  }, [interviewer]);

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={"Enter Student Name"}
            value={student}
            onChange={e => setStudent(e.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <div className="appointment__validation">{studentValidation}</div>
        <InterviewerList
          interviewers={interviewers}
          onChange={setInterviewer}
          value={interviewer}
        />
        <div className="appointment__validation">{interviewerValidation}</div>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button
            confirm
            onClick={() => onSave(student, interviewer)}
            disabled={!student || !interviewer}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
