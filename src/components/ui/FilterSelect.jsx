export const FilterSelect = ({
  className,
  htmlFor,
  label,
  labelClass,
  name,
  option,
}) => {
  return (
    <div className="select-container">
      <label className={`label ${labelClass}`} htmlFor={htmlFor}>
        {label}
      </label>
      <select className={`select ${className}`} name={name} id={htmlFor}>
        {option.map((item) => (
          <option key={item.value} value={item.value} 
          // selected={item.selected}
          >
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelect;
