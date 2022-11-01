import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const dayList = props.days.map(d => <DayListItem
      key={d.id}
      name={d.name}
      spots={d.spots}
      selected={d.name === d.day}
      setDay={props.setDay}
    />
  );
  return <ul>{dayList}</ul>;
}
