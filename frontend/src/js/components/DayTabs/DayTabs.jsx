import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
    Col,
    Nav,
    NavItem,
    NavLink,
    Row,
} from 'reactstrap';

import DayDetails from '../DayDetails/DayDetails';

class DayTabs extends React.Component {
    state = {
        activeDayTab: 'day1',
    };

    handleSetDayTab = (tab) => {
        this.setState({
            activeDayTab: tab,
        });
    };

    render() {
        const {
            activeDayTab,
        } = this.state;

        const {
            day1_morning,
            day1_lunch,
            day1_afternoon,
            day1_diner,
            day2_morning,
            day2_lunch,
            day2_afternoon,
            day2_diner,
            day3_morning,
            day3_lunch,
            day3_afternoon,
            day3_diner,
            number_of_days
        } = this.props;

        let dayDescription;

        if (activeDayTab === 'day1') {
            dayDescription = (
                <DayDetails
                    morning={day1_morning}
                    lunch={day1_lunch}
                    afternoon={day1_afternoon}
                    diner={day1_diner}
                />);
        } else if (activeDayTab === 'day2') {
            dayDescription = (
                <DayDetails
                    morning={day2_morning}
                    lunch={day2_lunch}
                    afternoon={day2_afternoon}
                    diner={day2_diner}
                />);
        } else {
            dayDescription = (
                <DayDetails
                    morning={day3_morning}
                    lunch={day3_lunch}
                    afternoon={day3_afternoon}
                    diner={day3_diner}
                />);
        }

        return (
            <Fragment>
                <Row>
                    {
                        number_of_days > 1 &&
                        (<Col xs="10" md={{ size: 10, offset: 1 }}>
                            <Nav tabs className="day-tabs">
                                <NavItem>
                                    <NavLink
                                        onClick={() => {
                                            this.handleSetDayTab('day1');
                                        }}
                                        active={activeDayTab === 'day1'}
                                    >
                                        Day One
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        onClick={() => {
                                            this.handleSetDayTab('day2');
                                        }}
                                        active={activeDayTab === 'day2'}
                                    >
                                        Day Two
                                    </NavLink>
                                </NavItem>
                                {
                                    number_of_days > 2 &&
                                    (<NavItem>
                                        <NavLink
                                            onClick={() => {
                                                this.handleSetDayTab('day3');
                                            }}
                                            active={activeDayTab === 'day3'}
                                        >
                                            Day Three
                                        </NavLink>
                                    </NavItem>)
                                }

                            </Nav>
                        </Col>)
                    }
                </Row>
                {dayDescription}
            </Fragment>
        );
    };
}

DayTabs.propTypes = {
    day1_morning: PropTypes.string,
    day1_lunch: PropTypes.string,
    day1_afternoon: PropTypes.string,
    day1_diner: PropTypes.string,
    day2_morning: PropTypes.string,
    day2_lunch: PropTypes.string,
    day2_afternoon: PropTypes.string,
    day2_diner: PropTypes.string,
    day3_morning: PropTypes.string,
    day3_lunch: PropTypes.string,
    day3_afternoon: PropTypes.string,
    day3_diner: PropTypes.string,
    number_of_day: PropTypes.number,
};

DayTabs.defaultProps = {
    day1_morning: '',
    day1_lunch: '',
    day1_afternoon: '',
    day1_diner: '',
    day2_morning: '',
    day2_lunch: '',
    day2_afternoon: '',
    day2_diner: '',
    day3_morning: '',
    day3_lunch: '',
    day3_afternoon: '',
    day3_diner: '',
    number_of_day: 1,
};

export default DayTabs;
