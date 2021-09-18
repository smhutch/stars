import React, { useState } from "react";
import clsx from "clsx";
import { HalfStar, Star } from "./Star";

export const STAR_INPUT_NAME = "rating";

const HiddenRadioInput = ({ checked, className, id, onChange, value }) => {
  return (
    <input
      aria-checked={checked}
      checked={checked}
      className={clsx("visually-hidden", className)}
      id={id}
      name={STAR_INPUT_NAME}
      onChange={onChange}
      type="radio"
      value={value}
      required
    />
  );
};

const StarInputOption = ({
  checked,
  id,
  onSelect,
  selected,
  starType,
  value,
  side,
}) => {
  return (
    <div className={`star-input-option star-input-option-${side}`}>
      <HiddenRadioInput
        checked={checked}
        className={selected ? "selected" : ""}
        id={id}
        onChange={onSelect}
        value={value}
      />
      <label htmlFor={id}>
        <span className="visually-hidden">
          {value === 1 ? "1 star" : `${value} stars`}
        </span>
        <HalfStar type={side} />
      </label>
    </div>
  );
};

export const StarInput = ({ id: formId }) => {
  const [selectedValue, setSelectedValue] = useState(0);

  /**
   * @param {number} value
   */
  const getOptionProps = (value) => {
    const checked = selectedValue === value;
    const isHalf = value % 1 === 0.5;

    return {
      checked,
      // Ids must be scoped to a globally unique ID, otherwise
      // selecting an option in one radiogroup can impact
      // another one.
      id: `star-option-${formId}-${value}`,
      onSelect: () => setSelectedValue(value),
      selected: value <= selectedValue,
      side: isHalf ? "left" : "right",
      starType: value % 1 === 0 ? "empty" : "half",
      value,
    };
  };

  return (
    <div className="star-input" role="radiogroup">
      <StarInputOption {...getOptionProps(0.5)} />
      <StarInputOption {...getOptionProps(1.0)} />
      <StarInputOption {...getOptionProps(1.5)} />
      <StarInputOption {...getOptionProps(2.0)} />
      <StarInputOption {...getOptionProps(2.5)} />
      <StarInputOption {...getOptionProps(3.0)} />
      <StarInputOption {...getOptionProps(3.5)} />
      <StarInputOption {...getOptionProps(4.0)} />
      <StarInputOption {...getOptionProps(4.5)} />
      <StarInputOption {...getOptionProps(5.0)} />
    </div>
  );
};
