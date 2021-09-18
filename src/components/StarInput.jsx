import React, { useState } from "react";
import clsx from "clsx";
import { Star } from "./Star";

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

const StarInputOption = ({ checked, id, onSelect, selected, value }) => {
  return (
    <div className="star-input-option">
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
        {/* Note: Fill is overridden with CSS */}
        <Star type="empty" />
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

    return {
      checked,
      // Must be scoped to a globally unique ID, otherwise
      // selecting an option in one radiogroup can impact
      // another one.
      id: `star-option-${formId}-${value}`,
      onSelect: () => setSelectedValue(value),
      starType: "empty",
      selected: value <= selectedValue,
      value,
    };
  };

  return (
    <div className="star-input" role="radiogroup">
      <StarInputOption {...getOptionProps(1)} />
      <StarInputOption {...getOptionProps(2)} />
      <StarInputOption {...getOptionProps(3)} />
      <StarInputOption {...getOptionProps(4)} />
      <StarInputOption {...getOptionProps(5)} />
    </div>
  );
};
