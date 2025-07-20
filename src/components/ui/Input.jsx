import PropTypes from "prop-types";
import React from "react";

const Input = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      autoComplete="off"
      className={`border-2 bg-custom-100 border-custom-250 p-2 w-full mt-4 rounded-xl placeholder-custom-250 font-normal text-base text-custom-250 focus:outline-none focus:border-custom-250 focus:ring-1 focus:ring-custom-250 ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";

Input.propTypes = {
  props: PropTypes.object,
  className: PropTypes.string,
};

export default Input;
