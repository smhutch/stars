import { createStarEl } from "./stars";

export const STAR_INPUT_NAME = "rating";
const SELECTED_STAR_CLASS = "selected";

/**
 * @param {number} value
 * @param {string} id
 * @returns {HTMLInputElement}
 */
const createHiddenRadioInput = (value, id) => {
  const input = document.createElement("input");
  input.setAttribute("aria-checked", false);
  input.setAttribute("class", "visually-hidden");
  input.setAttribute("name", STAR_INPUT_NAME);
  input.setAttribute("role", "radio");
  input.setAttribute("type", "radio");
  input.setAttribute("value", String(value));
  input.setAttribute("id", id);

  input.addEventListener("change", (event) => {
    /** @type {HTMLInputElement | null} */
    const option = event.target;
    if (!option) return;

    if (!option.checked) {
      option.setAttribute("aria-checked", false);
      option.setAttribute("checked", true);
    }

    const options = document.querySelectorAll("[role=radiogroup] input");
    let hasSetChecked = false;

    Array.from(options).forEach((option) => {
      option.setAttribute("aria-checked", false);
      option.setAttribute("checked", false);

      if (hasSetChecked) {
        option.classList.remove(SELECTED_STAR_CLASS);
        return;
      }

      option.classList.add(SELECTED_STAR_CLASS);

      if (option === event.target) {
        option.setAttribute("aria-checked", true);
        option.setAttribute("checked", true);
        hasSetChecked = true;
      }
    });
  });

  return input;
};

/**
 * @param {number} value
 * @param {string} id
 * @returns {HTMLLabelElement}
 */
const createStarLabel = (value, id) => {
  const starLabel = document.createElement("label");
  starLabel.setAttribute("for", id);

  const span = document.createElement("span");
  span.classList.add("visually-hidden");
  span.textContent = value === 1 ? "1 star" : `${value} stars`;

  const star = createStarEl("empty");

  starLabel.append(span, star);

  return starLabel;
};

/**
 * @param {number} value
 * @returns {HTMLDivElement}
 */
const createStarInputOption = (value) => {
  const div = document.createElement("div");
  const id = `star-option-${value}`;
  div.classList.add("star-input-option");

  div.append(createHiddenRadioInput(value, id), createStarLabel(value, id));

  return div;
};

/**
 * @returns {HTMLDivElement}
 */
export const createStarInput = () => {
  const group = document.createElement("div");
  group.setAttribute("role", "radiogroup");
  group.classList.add("star-input");

  group.append(
    createStarInputOption(1),
    createStarInputOption(2),
    createStarInputOption(3),
    createStarInputOption(4),
    createStarInputOption(5)
  );

  return group;
};
