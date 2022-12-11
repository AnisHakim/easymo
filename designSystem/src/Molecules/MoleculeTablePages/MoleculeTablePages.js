import React from 'react'
import MoleculeSelect from '../MoleculeSelect/MoleculeSelect'

function MoleculeTablePages(props) {

  const customStyles = {
    control: (base, state) => ({
      ...base,
      border: '1px solid transparent',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid transparent',
      }
    })
  }
  return (
    <div className='col-sm mb-2 mb-sm-0'>
      <div className='flex justify-center item-center justify-content-sm-start'>
        <span class="display-text mr-2">{props.displayText}</span>
        <MoleculeSelect
          options={props.options}
          value={props.perPage}
          menuPlacement={props.menuPlacement}
          customStyles={customStyles}
          onChange={props.setPerPage}
        />
        <span className="display-text mr-2">{props.onText}</span>
        <span className="display-text">{props.totalPages}</span>
      </div>

    </div>
  )
}

export default MoleculeTablePages