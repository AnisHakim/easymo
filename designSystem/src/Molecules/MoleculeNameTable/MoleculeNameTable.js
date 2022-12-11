import React, { useEffect, useState } from 'react'
import { Img, Spinner } from '../../Atoms'
import { Dropdown } from '../';
import translator from "../../lang/translator";
import imgDefault from '../../assets/img/properties/01/default-property-thumbnail.jpg';
import { apiGetImage } from '../../Api/Property';

const MoleculeNameTable = (props) => {
  const [localImage, setLocalImage] = useState(null)
  const lang = translator('fr');
  const options = [
    {
      title: 'options',
      details:
        [
          { text: lang.edit, withStartIcon: true, iconStart: 'edit' },
          { text: lang.duplicate, withStartIcon: true, iconStart: 'copy', onClickContainer: () => props.onAction('duplicate', props.id) },
          { text: lang.resell, withStartIcon: true, iconStart: 'forward' },
          { text: lang.export, withStartIcon: true, iconStart: 'share_vs', onClickContainer: () => props.exportPropertie(props.id) },
          { text: lang.archive, withStartIcon: true, iconStart: 'archive', onClickContainer: () => props.onAction('archive', props.id) }
        ]
    },
    {
      title: ' ',
      details:
        [
          { text: lang.delete, withStartIcon: true, iconStart: 'delete', textclassName: 'text-dropdown-delete-color', onClickContainer: () => props.onAction('delete', props.id) }
        ]
    }
  ]

  const optionsArchived = [
    {
      title: 'options',
      details:
        [
          { text: lang.actived, withStartIcon: true, iconStart: 'archive', onClickContainer: () => props.onAction('active', props.id) },
          { text: '' }
        ]
    },
    {
      title: ' ',
      details:
        [
          { text: lang.delete, withStartIcon: true, iconStart: 'delete', textclassName: 'text-dropdown-delete-color', onClickContainer: () => props.onAction('delete', props.id) }
        ]
    }
  ]
  const returnOption = () => {
    if (props.status === "sold") {
      return options
    }
    else {
      return [
        {
          title: 'options',
          details:
            [
              { text: lang.edit, withStartIcon: true, iconStart: 'edit' },
              { text: lang.duplicate, withStartIcon: true, iconStart: 'copy', onClickContainer: () => props.onAction('duplicate', props.id) },
              { text: lang.export, withStartIcon: true, iconStart: 'share_vs', onClickContainer: () => props.exportPropertie(props.id) },
              { text: lang.archive, withStartIcon: true, iconStart: 'archive', onClickContainer: () => props.onAction('archive', props.id) }
            ]
        },
        {
          title: ' ',
          details:
            [
              { text: lang.delete, withStartIcon: true, iconStart: 'delete', textclassName: 'text-dropdown-delete-color', onClickContainer: () => props.onAction('delete', props.id) }
            ]
        }
      ]
    }
  }
  const getImage = async () => {
    apiGetImage(props.srcImg).then(file => {
      setLocalImage(file)
    })
  }
  useEffect(() => {
    if (props.srcImg)
      getImage()
  }, [props.srcImg])
  return (
    <div className="name-table-properties flex item-center ">
      <Dropdown
        inTab
        onPickItem={props.onPickItem}
        iconStartClass={'icon-table'}
        dropdownBtn={'btn-ghost-dark'}
        withStartIcon={true}
        iconStart='more_vertical'
        text={''}
        withEndIcon={false}
        options={props.isArchiveStatus ? optionsArchived : returnOption()}
      />
      {props.srcImg && !localImage ?
        <Spinner /> :
        <Img type="SMALL SQUARE" className='photo-propriete img-cover' src={localImage ? localImage : imgDefault} alt='img' />
      }
      <span onClick={props.onClick} className={`${props.isArchiveStatus && 'name-table-properties-archived'} text-name-table-properties ml-3`}>{props.textName}</span>
      {props.isArchiveStatus && <span className="archived-text-table-properties ml-2">{lang.archived}</span>}
    </div>
  )
}
export default MoleculeNameTable
