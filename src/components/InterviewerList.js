import React from "react";
import PropTypes from "prop-types";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

const InterviewerList = props => {
  const { interviewers, onChange, value } = props;
  const interviewerListItems = interviewers.map(i => {
    return (
      <InterviewerListItem
        key={i.id}
        name={i.name}
        avatar={i.avatar}
        selected={i.id === value}
        setInterviewer={() => onChange(i.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerListItems}</ul>
    </section>
  );
};

InterviewerList.PropTypes = {
  interviewers: PropTypes.array.isRequired,
  onchange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default InterviewerList;
