import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { name, selected, spots, setDay } = props;
  const dayListItemClass = classNames(
    'day-list__item',
    { 'day-list__item--selected': selected },
    { 'day-list__item--full': spots === 0 }
  );

  return (
    <li onClick={() => setDay(name)} className={dayListItemClass}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">
        {spots > 1 && `${spots} spots remaining`}
        {spots === 1 && `1 spot remaining`}
        {spots === 0 && `no spots remaining`}
      </h3>
    </li>
  );
}
