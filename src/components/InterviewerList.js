import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

function InterviewerList(props) {
  const { interviewers, setInterviewer, interviewer } = props;
  const interviewerListItems = interviewers.map(i => {
    return <InterviewerListItem
      key={i.id}
      name={i.name}
      avatar={i.avatar}
      selected={i.id === interviewer}
      setInterviewer={() => setInterviewer(i.id)}
    />
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerListItems}</ul>
    </section>
  );
}

export default InterviewerList;
