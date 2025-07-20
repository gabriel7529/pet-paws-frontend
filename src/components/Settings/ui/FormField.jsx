import PropTypes from "prop-types";
import TextInput from "./TextInput";

const FormField = ({ id, label, register, errors, type }) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-custom-350">
        {label}
      </label>
      {type !== "textarea" ? (
        <TextInput id={id} register={register} type={type} />
      ) : (
        <textarea
          id={id}
          {...register(id)}
          className="border p-2 w-full resize-none border-custom-250 rounded-lg text-custom-250"
          rows="4"
        />
      )}
      {errors[id] && <p className="text-red-500">{errors[id].message}</p>}
    </div>
  );
};

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  type: PropTypes.string,
};

export default FormField;
