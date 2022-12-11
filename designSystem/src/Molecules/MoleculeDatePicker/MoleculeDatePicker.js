
import DateRangePicker from 'react-bootstrap-daterangepicker';
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import translator from '../../lang/translator'
import { Icon } from '../../Atoms'
import propTypes from 'prop-types';
import * as uuid from 'uuid'

MoleculeDatePicker.propTypes = {
    isSingleDate: propTypes.bool,
    clearDate: propTypes.bool,
    start: propTypes.any,
    end: propTypes.any,
};
MoleculeDatePicker.defaultProps = {
    isSingleDate: false,
    clearDate: false,
    start: null,
    end: null,
    iconClass: '',
    isPlaceholder: false,
    minDate: null,
}
function MoleculeDatePicker(props) {
    const [pickerId, setPickierId] = useState(uuid.v4());
    const [dateId, setDateId] = useState(uuid.v4());
    const ref = useRef()
    const lang = translator('fr')
    const [show, setShow] = useState(false)
    const language = 'fr'
    const [state, setState] = useState({
        start: props.start,
        end: props.end,
    })
    const { start, end } = state;
    const onApply = (e, picker) => {
        setState({
            start: picker.startDate,
            end: picker.endDate
        })
        props.onApply && props.onApply(picker.startDate, picker.endDate)
    };
    let object = {
        parentEl: "main",
        showDropdowns: true,
    }
    let local = {
        "format": "DD/MM/YYYY",
        "daysOfWeek": lang.daysOfWeek,
        "weekLabel": lang.W,
        "monthNames": lang.monthNames,
        "applyLabel": lang.Appliquer,
        "cancelLabel": lang.Annuler,
        "firstDay": 1,
        direction: pickerId,
    }
    if (props.isSingleDate) {
        object['autoApply'] = true
        object['singleDatePicker'] = true
        object['minYear'] = 1901
        object["startDate"] = moment().toDate()
        if (props.minDate)
            object['minDate'] = props.minDate
    } else {
        object['startDate'] = start ? start.toDate() : moment()
        object['endDate'] = end ? end.toDate() : moment()
        object['ranges'] = {
            [lang.today]: [moment().toDate(), moment().toDate()],
            [lang.Yesterday]: [
                moment().subtract(1, 'days').toDate(),
                moment().subtract(1, 'days').toDate(),
            ],
            [lang.last7Days]: [
                moment().subtract(6, 'days').toDate(),
                moment().toDate(),
            ],
            [lang.last30Days]: [
                moment().subtract(29, 'days').toDate(),
                moment().toDate(),
            ],
            [lang.thisMonth]: [
                moment().startOf('month').toDate(),
                moment().endOf('month').toDate(),
            ],
            [lang.lastMonth]: [
                moment().subtract(1, 'month').startOf('month').toDate(),
                moment().subtract(1, 'month').endOf('month').toDate(),
            ],
        }
        local = {
            ...local,
            "separator": " - ",
            "fromLabel": lang.De,
            "toLabel": lang.à,
            "customRangeLabel": lang.Personnaliser,
            direction: " daterangepicker-large-position " + pickerId,
        }
    }
    object['locale'] = local
    useEffect(() => {
        setState({
            start: props.start,
            end: props.end
        })
    }, [props.clearDate])
    useEffect(() => {
        if (props.isSingleDate) {
            setState({
                start: props.start ? moment(props.start).locale(language) : null
            })
        }
    }, [props.start])
    const className = ["picker-range-input"]
    if (show) {
        className.push('relative')
    }
    function onShow() {
        setShow(true)
    }
    React.useEffect(() => {
        const pageContent = document.getElementById('page-content')
        if(show){
            const picker = document.getElementsByClassName(pickerId)
            pageContent.addEventListener('scroll', () => {
                let top=ref.current.ref.offsetTop-pageContent.scrollTop 
                if(props.isSingleDate) {top+=300} else top+=40
                picker[0].style.top = top + "px"
            })
        }else{
            pageContent.removeEventListener("scroll",()=>{})
        }
    }, [show])
    return (
        <DateRangePicker
            initialSettings={object}
            onApply={onApply}
            ref={ref}
            onShow={() => onShow()}
            onHide={() => setShow(false)}
        >
            <div
                ref={ref}
                id={"reportrange " + dateId}
                className={className.join(' ')}

            >
                {show && <div className='absolute date-picker-pointer' ></div>}
                <Icon icon='date_range' className={'icon-picker-range mr-1 ' + props.iconClass} />
                <span className={props.isSingleDate ? !start && props.isPlaceholder ? 'placeholder-label' : '' : !start && !end && props.isPlaceholder ? 'placeholder-label' : ''} >
                    {
                        props.isSingleDate
                            ?
                            start ?
                                start.locale(language).format('DD/MM/YY')
                                : lang.addDate :
                            !start && !end ? lang.addDate
                                :
                                start.locale(language).format('DD/MM/YY') + ' - ' + end.locale(language).format('DD/MM/YY')
                    }
                </span>
            </div>
        </DateRangePicker >
    )
}

export default MoleculeDatePicker
