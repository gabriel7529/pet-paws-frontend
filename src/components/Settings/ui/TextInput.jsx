import PropTypes from 'prop-types';

const TextInput = ({ id, register, className, ...rest }) => {
  return (
    <input
      type="text"
      id={id}
      {...register(id)}
      className={`border p-2 w-full rounded-lg border-custom-200 text-custom-350 ${className}`}
      {...rest}
    />
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default TextInput;
