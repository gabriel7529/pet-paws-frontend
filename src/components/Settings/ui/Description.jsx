import {PropTypes} from 'prop-types';

const Description = ({text}) => {
  return (
    <p className="text-center text-custom-350">
      {text}
    </p>
  );
}

Description.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Description;
