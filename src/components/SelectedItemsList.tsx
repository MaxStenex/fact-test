import React from "react";

type Props = {
  selectedValues: Array<string>;
};

export const SelectedItemsList: React.FC<Props> = ({ selectedValues }) => {
  return (
    <ul className="app__selected-items">
      {selectedValues.map((item, index) => (
        <li key={item + index}>{item}</li>
      ))}
    </ul>
  );
};
