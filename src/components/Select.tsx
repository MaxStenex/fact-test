import React, { useEffect, useState } from "react";

type Props = {
  options: Array<any>;
  addItemsInSelectedValues: (
    prevSelectItems: Array<string>,
    newSelectItems: Array<string>
  ) => void;
};

export const Select: React.FC<Props> = ({ options, addItemsInSelectedValues }) => {
  const [values, setValues] = useState<Array<string>>([]);
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = e.target.selectedOptions;
    const selectedValues = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      const currValue = selectedOptions[i].value;
      selectedValues.push(currValue);
    }

    addItemsInSelectedValues(values, selectedValues);

    setValues(selectedValues);
  };

  useEffect(() => {
    setValues([]);
  }, [options]);

  return (
    <select
      multiple={true}
      className="select"
      value={values}
      onChange={handleSelectChange}
    >
      {options.map((item, index) => (
        <option
          className="select__option"
          value={JSON.stringify(item)}
          key={item + index}
        >
          {JSON.stringify(item)}
        </option>
      ))}
    </select>
  );
};
