import './PseudoButtonTag.scss';
import PropTypes from 'prop-types';

function PseudoButtonTag({
  type,
  name,
  value,
  title,
  isActive,
  onClick
}) {
  const id = `filter-button-${value}`;

  function handleClick(event) {
    onClick(value, event.target.checked);
  }

  return (
    <label
      className="pseudo-button-label"
      htmlFor={id}
    >
      <input
        id={id}
        className="pseudo-button-checkbox"
        type={type}
        name={name}
        value={value}
        checked={isActive}
        onChange={() => {}}
        onClick={handleClick}
      />
      <span
        className="button pseudo-button"
      >
        {title}
      </span>
    </label>
  );
}

PseudoButtonTag.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  title: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
};

PseudoButtonTag.defaultProps = {
  type: 'radio',
  name: '',
  value: '',
  title: '',
  isActive: false,
  onClick: () => {}
};

export default PseudoButtonTag;
