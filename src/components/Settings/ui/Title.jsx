import { PropTypes } from 'prop-types';

const Title = ({ text }) => (
  <h2 className="text-2xl font-bold text-center mb-2 text-custom-350">{text}</h2>
);

Title.propTypes = {
  text: PropTypes.string.isRequired,
};
export default Title;
