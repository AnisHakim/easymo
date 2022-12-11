import React from 'react'
import { Button } from '../../Atoms'
import propTypes from 'prop-types';

MoleculeFilter.propTypes = {
    textFilter: propTypes.string,
    textButtonOne: propTypes.array,
    textButtonTwo: propTypes.string,
    textThirdButton: propTypes.string,
    onClickIcon: propTypes.any,
    onClickIcon2: propTypes.any,
    onClickThirdIcon: propTypes.any,
};
MoleculeFilter.defaultProps = {
    textFilter: '',
    textButtonOne: [],
    textButtonTwo: '',
    textThirdButton: '',
    onClickIcon: null,
    onClickIcon2: null,
    onClickThirdIcon: null,
};

function MoleculeFilter(props) {
    return (
        <div className='pddb-3'>
            <div className='col-auto flex flex-direction-row item-center flex-wrap'>
                <span className="filter-text mr-2 pb-3">{props.textFilter}</span>
                {props.textButtonOne.map((el, i) => <Button key={i} onClickIcon={() => el.action(el.label)} iconRight icon='clear' type='outline' containerClassName='mr-2 pb-3' text={el.label} />)}
                {props.textButtonTwo !== '' && <Button onClickIcon={() => props.onClickIcon2(props.textButtonTwo)} iconRight icon='clear' type='outline' containerClassName='mr-3 pb-3' text={props.textButtonTwo} />}
                {props.textThirdButton !== '' && <Button onClickIcon={() => props.onClickThirdIcon(props.textThirdButton)} iconRight icon='clear' type='outline' containerClassName='mr-3 pb-3' text={props.textThirdButton} />}
            </div>
        </div>
    )
}

export default MoleculeFilter
