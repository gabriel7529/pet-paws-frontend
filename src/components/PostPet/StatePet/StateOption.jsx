import PropTypes from 'prop-types';

const StateOption = ({ label, checked, onChange }) => {

  return (
    <div className={`flex justify-between items-center p-4 border-2 rounded-lg ${checked ? 'border-[#FF4146]' : 'border-[#FF4146]'} mb-2`}
    onClick={onChange}
    >
      <span className={`text-lg ${checked ? 'text-[#FF4146] font-bold' : 'text-[#FF4146]'}`}>{label}</span>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${checked ? 'bg-[#FF4146]' : 'border-2 border-pink-200'}`}>
        {checked && <div className="w-3 h-3 bg-white rounded-full"></div>}
      </div>
    </div>
  );
};

StateOption.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StateOption;
