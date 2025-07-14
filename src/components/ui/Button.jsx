import PropTypes from "prop-types";

const Button = ({ children, ...props }) => {
  return (
    <button className="btn-primary" {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  props: PropTypes.object,
};

export default Button;
