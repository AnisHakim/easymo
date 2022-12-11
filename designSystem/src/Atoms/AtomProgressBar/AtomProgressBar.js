import { useEffect, useState } from "react";
import propTypes from 'prop-types';
import { Text } from "..";

AtomProgressBar.defaultProps = {
    percent: 10,
    width: 100,
    withLabel: true,
    progressContainerClass: null,
    progressBarClass: null,
    progressColor: '',
    withPercentage: false
};
AtomProgressBar.propTypes = {
    withLabel: propTypes.bool,
    percent: propTypes.number,
    width: propTypes.number,
    progressContainerClass: propTypes.string,
    progressBarClass: propTypes.string,
    progressColor: propTypes.string,
    withPercentage: propTypes.bool
};
function AtomProgressBar(props) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        setValue((props.percent * props.width / 100));
    });
    const progressContainerClass = ["atom-progress-div"]
    if (props.progressContainerClass) {
        progressContainerClass.push(props.progressContainerClass)
    }
    const progressBarClass = ["atom-progress"]
    if (props.progressBarClass) {
        progressBarClass.push(props.progressBarClass)
    }
    return (
        <div className={progressContainerClass.join(' ')} style={{ width: `${props.width}%` }}>
            <div style={{ width: `${value}%`, backgroundColor: props.progressColor }} className={progressBarClass.join(' ')} >
                {props.withPercentage && < Text text={`${props.percent}%`} className="progress-percentage mb-0" />}
            </div>
        </div>
    )
}

export default AtomProgressBar
