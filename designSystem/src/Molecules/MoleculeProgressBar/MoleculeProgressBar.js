import propTypes from 'prop-types';
import { ProgressBar, Text } from '../../Atoms';

MoleculeProgressBar.propTypes = {
    progressLabel: propTypes.string,
    progressLabelClassName: propTypes.string,
    percent: propTypes.number,
    isReset: propTypes.bool,
};
MoleculeProgressBar.defaultProps = {
    progressLabel: '',
    progressLabelClassName: '',
    width: 100,
    isReset: false,
};

function MoleculeProgressBar(props) {
    function renderProgressLabel() {
        if (props.progressLabel) {
            const progressLabelClassName = ['mb-0 mr-2 grey-text label-progress-size']
            if (props.progressLabelClassName) {
                progressLabelClassName.push(props.progressLabelClassName)
            }
            return <Text text={props.progressLabel} type='h5' className={progressLabelClassName.join(' ')} />
        }
    }
    return (
        <>
            {props.isReset && renderProgressLabel()}
            <div className='flex justify-space-between item-center mt-2'>
                {!props.isReset && renderProgressLabel()}
                <ProgressBar percent={props.percent} progressColor={props.progressColor} />
            </div>
        </>
    )
}

export default MoleculeProgressBar
