import PropTypes from 'prop-types';

const FormField = ({
  label,
  type = "text",
  placeholder = "",
  options = [],
  ...props
}) => {
  if (type === "radio") {
    return (
      <div className="flex items-center space-x-8 space-y-8">
        <label className="block text-sm text-[#FF4146] font-medium ">{label}</label>
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              id={option.value}
              type="radio"
              value={option.value}

              className="w-5 h-5 text-blue-600"
              {...props}
            />
            <label htmlFor={option.value} className="ml-2 text-sm">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-900">{label}</label>
        <textarea

          placeholder={placeholder}
          className="block w-full px-4 py-2 mt-1 text-sm border rounded-lg"
          {...props}
        />
      </div>
    );
  }

  return (
    <div>
      <label  className="block text-sm font-medium text-[#FF4146] my-4">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="block w-full px-4 py-2 mt-1 text-sm border-2 border-[#FFB0A9] rounded-lg text-[#FF797D]"
        {...props}
      />
    </div>
  );
};

// Añadir PropTypes
FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'radio', 'textarea', 'file', 'number', 'datetime-local']),

  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
};

export default FormField;
