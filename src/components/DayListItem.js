import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayListItemClass = classNames(
    'day-list__item',
    { 'day-list__item--selected': props.selected },
    { 'day-list__item--full': props.spot === 0 }
);

  return (
    <li onClick={() => props.setDay(props.name)} className={dayListItemClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">
        {props.spots > 1 && `${props.spots} spots remaining`}
        {props.spots === 1 && `1 spot remaining`}
        {props.spots === 0 && `no spots remaining`}
      </h3>
    </li>
  );
}
