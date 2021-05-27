import PropTypes from 'prop-types';
import TitleH1 from '../ui/TitleH1/TitleH1';
import ButtonTags from '../ui/Button/ButtonTags';
import './Calendar.scss';
import CardCalendar from '../ui/CardCalendar/CardCalendar';
import { MonthData } from '../../utils/constants';

function Calendar({
  onEventSignUpClick,
  onEventFullDescriptionClick,
  clickButton,
  isSelected,
  dataCalendar,
  isBooked
}) {
  return dataCalendar ? (
    <section className="lead page__section">
      <TitleH1 title="Календарь" />
      <div className="tags">
        <ul className="tags__list">
          {MonthData.map((data) => (
            <li className="tags__list-item" key={data.id}>
              <ButtonTags title={data.name} color="black" />
            </li>
          ))}
        </ul>
      </div>
      <section className="calendar-container">
        { dataCalendar.events.map((data) => (
          <CardCalendar
            key={data.id}
            data={data}
            onEventSignUpClick={onEventSignUpClick}
            onEventFullDescriptionClick={onEventFullDescriptionClick}
            clickButton={clickButton}
            isSelected={isSelected}
            isBooked={isBooked}
          />
        ))}
      </section>
    </section>
  ) : (
    <p style={{ color: 'red', margin: '0 auto', textAlign: 'center' }}>Loading</p>
  );
}

Calendar.propTypes = {
  onEventSignUpClick: PropTypes.func,
  onEventFullDescriptionClick: PropTypes.func,
  clickButton: PropTypes.func,
  isSelected: PropTypes.bool,
  dataCalendar: PropTypes.objectOf(PropTypes.any),
  isBooked: PropTypes.bool
};

Calendar.defaultProps = {
  onEventSignUpClick: undefined,
  onEventFullDescriptionClick: undefined,
  clickButton: undefined,
  isSelected: false,
  dataCalendar: {},
  isBooked: false
};

export default Calendar;
