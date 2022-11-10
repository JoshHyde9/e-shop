import PropTypes from "prop-types";

import styles from "./Selection.module.scss";

/**
 * @param {{handleOption: React.Dispatch<React.SetStateAction<string>>, label: string, array: Array<any>}} props
 * @returns {JSX.Element}
 */
export const Selection = ({ handleOption, label, array }) => {
  return (
    <>
      <label htmlFor={label}>{label}: </label>
      <select className={styles.select} name={label}>
        <option hidden>{label}</option>
        {array.map((item, i) => (
          <option key={i} value={item} onClick={() => handleOption(item)}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
};

Selection.propTypes = {
  handleOption: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  array: PropTypes.array.isRequired,
};
