
import PropTypes from 'prop-types';

const FormSelect = ({ label, value, onChange, options }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-[#FF4146] mb-1">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full p-2 border-2 border-[#FFB0A9] rounded-md text-[#FF797D]"
        required
      >
        <option className="text-[#FF797D]" value="" > {`Agregar ${label.toLowerCase()}`} </option>
        {options.map((option) => (
          <option className="text-[#FF4146] bg-[#FFEBEA]" key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired
};


export default FormSelect;
