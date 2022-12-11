import React from 'react'
import { Text } from '../../Atoms'
import propTypes from 'prop-types';

MoleculeTransactionNav.propTypes = {
    listNav: propTypes.array

};
MoleculeTransactionNav.defaultProps = {
    listNav: []
}
export default function MoleculeTransactionNav(props) {
    return (
        <div className='flex transaction-nav-container flex-wrap'>
            {props.listNav.map((el, index) =>
                <div key={index} className={`${el.isActive ? "transaction-nav-text-active" : "transaction-nav-text"} pointer`} onClick={() => props.onClickNavItem(index, el.key)}>
                    <div className='flex'>
                        <Text text={el.value} type="h5" className='mb-0' />
                        {el.number ?
                            <div className='flex justify-center item-center transaction-navbar-number ml-1'>
                                <Text text={el.number} type="h5" className='mb-0' />
                            </div>
                            : null}
                    </div>
                </div>
            )}
        </div>
    )
}


