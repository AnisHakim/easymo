import React, { useEffect, useState } from 'react'
import { Text } from '../../Atoms';
import MoleculeTextIcon from '../MoleculeTextIcon/MoleculeTextIcon';
function MoleculeCard(props) {
    const [count, setCount] = useState("0")

    useEffect(() => {
        let start = 0;
        let duration = 1
        const end = parseInt(props.textQuantityOne.substring(0, 3))
        if (start === end) return;

        let totalMilSecDur = parseInt(duration);
        let incrementTime = (totalMilSecDur / end) * 1000;

        let timer = setInterval(() => {
            start += 1;
            setCount(String(start) + props.textQuantityOne.substring(3))
            if (start === end) clearInterval(timer)
        }, incrementTime);

    }, [props.textQuantityOne]);
    return (
        <div className='w-100'>
            <div className='card h-100'>
                <div className="card-body">
                    <Text type='h6' className={props.subtitleClassName} text={props.subtitleText} />
                    <div className='flex flex-wrap item-center gx-2'>
                        <div className="col">
                            <span className='display-4 text-quantity'>{count}</span>
                            {props.textQuantityTwo ? <span className='text-quantity-two ml-1'>{props.textQuantityTwo}</span> : null}
                        </div>
                        <div className='col-auto mw-100'>
                            <div className={props.classNameIcon}>
                                <MoleculeTextIcon iconStart={props.icon} text={props.textIcon} textclassName={props.textIconClassName} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MoleculeCard
