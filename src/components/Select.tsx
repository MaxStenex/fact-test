import React, { useState } from "react";

type Props = {
  options: Array<any>;
};

export const Select: React.FC<Props> = ({ options }) => {
  const [values, setValues] = useState<Array<any>>([]);
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = e.target.selectedOptions;
    const selectedValues = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      const currValue = selectedOptions[i].value;
      selectedValues.push(currValue);
    }

    setValues(selectedValues);
  };

  return (
    <select
      multiple={true}
      className="select"
      value={values}
      onChange={handleSelectChange}
    >
      {options.map((o, i) => (
        <option className="select__option" value={JSON.stringify(o)} key={i}>
          {JSON.stringify(o)}
        </option>
      ))}
    </select>
  );
};
