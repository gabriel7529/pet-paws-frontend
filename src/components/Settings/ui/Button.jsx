import PropTypes from "prop-types";

const Button = ({ children, ...props }) => {
  return (
    <button className="bg-custom-200 w-48 ml-auto p-2 mb-4 mt-4 border-2 rounded-lg text-custom-50" {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  props: PropTypes.object,
};

export default Button;
