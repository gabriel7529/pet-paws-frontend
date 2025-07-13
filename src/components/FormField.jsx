import PropTypes from 'prop-types';

const FormField = ({
  label,
  type = "text",
  id,
  placeholder = "",
  options = [],
  ...props
}) => {
  if (type === "radio") {
    return (
      <div className="flex items-center space-x-4">
        <label className="block text-sm font-medium text-gray-900">{label}</label>
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              id={option.value}
              type="radio"
              value={option.value}
              name={id}
              className="w-4 h-4 text-blue-600"
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
        <label htmlFor={id} className="block text-sm font-medium text-gray-900">{label}</label>
        <textarea
          id={id}
          placeholder={placeholder}
          className="block w-full px-4 py-2 mt-1 text-sm border rounded-lg"
          {...props}
        />
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="block w-full px-4 py-2 mt-1 text-sm border rounded-lg"
        {...props}
      />
    </div>
  );
};

// Añadir PropTypes
FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'radio', 'textarea', 'file', 'number', 'datetime-local']),
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
};

export default FormField;
