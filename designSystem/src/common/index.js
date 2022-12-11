import { Icon, Text } from "../Atoms"
import { Grey } from "../Colors"
import { Tooltip } from "../Molecules"
import { getDistance } from 'geolib'
import Geocode from "react-geocode"

const renderError = ({ text, className, type = "" }) => {
    const errorClassname = ['input-error-message']
    if (className) {
        errorClassname.push(className)
    }
    return <Text text={text} type={type} className={errorClassname.join(' ')} />

}
const renderLabel = ({ labelClass, leftIconClass, leftLabelIcon, label, rightLabelIcon,
    isForgotPasswordLabel, onClickForgotPassword, listIcons, containerIconClassName, containerClassName }) => {
    const labelClassname = ['input-label']
    const leftIconClassname = ['mr-1 pointer ']
    if (labelClass) {
        labelClassname.push(labelClass)
    }
    if (leftIconClass) {
        leftIconClassname.push(leftIconClass)
    }
    const className = ['mb-2 flex item-center']
    if (containerClassName) {
        className.push(containerClassName)
    }
    return (
        <div className='flex justify-space-between'>
            <div className={className.join(' ')}>
                {leftLabelIcon && <Icon
                    icon={leftLabelIcon}
                    size={'1.125rem'}
                    className={leftIconClassname.join(' ')}
                    color={Grey}
                // onClick={onClickLeftIcon}
                />}
                <div className={labelClassname.join(' ')} >{label} </div>
                {rightLabelIcon && <Icon
                    icon={rightLabelIcon}
                    size={'1.125rem'}
                    className='ml-1 pointer '
                    color={Grey}
                />}
                {listIcons && listIcons.map((el, index) =>
                    <div key={index} className={"ml-1 " + el.containerIconClassName}>

                        {el.tooltip ?
                            <Tooltip
                                withIcon
                                icon={el.icon}
                                tooltipText={el.tooltipText}
                                iconClassname={"pointer " + el.iconClassname}
                                iconSize={el.iconSize ? el.iconSize : '1.125rem'}
                                iconColor={el.iconColor ? el.iconColor : Grey}
                                onClick={() => el.onClick && el.onClick(index)}
                                tooltipClassName={el.tooltipClassName}
                            />
                            : <Icon
                                icon={el.icon}
                                size={el.iconSize ? el.iconSize : '1.125rem'}
                                className={"pointer" + el.iconClassname}
                                color={el.iconColor ? el.iconColor : Grey}
                                onClick={() => el.onClick && el.onClick(index)}
                            />
                        }
                    </div>
                )}
            </div>
            {isForgotPasswordLabel && <Text
                text="Mot de passe oublié ?"
                type='h6'
                className='mb-0 forgot-password-text pointer'
                onClick={onClickForgotPassword} />}
        </div>)
}
const renderInputObject = (value, inputError, isValid, isInValid, placeholder) => {
    return {
        value: value,
        inputError: inputError,
        isValid: isValid,
        isInValid: isInValid,
        placeholder: placeholder
    }
}
const renderLabelObject = (inputLabel, errorClassname, labelClassname, labelIcon) => {
    return {
        inputLabel: inputLabel,
        errorClassname: errorClassname,
        labelClassname: labelClassname,
        labelIcon: labelIcon
    }
}
const renderIconTooltipObject = (icon, tooltip, tooltipTxt, iconClass) => {
    return {
        icon: icon,
        tooltip: tooltip,
        tooltipText: tooltipTxt,
        iconClassname: iconClass,
    }
}
const typeOfPlace = (element) => {
    let type = null
    switch (element) {
        case 'school':
            type = 'school'
            break;
        case 'home_goods_store':
        case 'light_rail_station':
        case 'subway_station':
        case 'train_station':
        case 'bus_station':
            type = 'publicTransport'
            break;
        case 'store':
        case 'clothing_store':
        case 'department_store':
        case 'shoe_store':
        case 'bicycle_store':
        case 'book_store':
        case 'pet_store':
        case 'electronics_store':
        case 'furniture_store':
        case 'jewelry_store':
        case 'liquor_store':
        case 'hardware_store':
        case 'convenience_store':
        case 'drugstore':
            type = 'store'
            break;
        case 'museum':
            type = 'museum'
            break;
        case 'restaurant':
        case 'food':
            type = 'restaurant'
            break;
        case 'gym':
            type = 'sportsHalls'
            break;
        case 'amusement_park':
        case 'park':
        case 'rv_park':
            type = 'park'
            break;
        case 'parking':
            type = 'parking'
            break;
        default:
            type = 'establishment'
            break;
    }
    return type
}

const getTypeAddress = async (address) => {
    const { lat, lng } = address
    if (lat && lng && typeof lat === 'string' && typeof lng === 'string') {
        if (parseInt(lat) && parseInt(lng)) {
            return new Promise((resolve, reject) => {
                Geocode.fromLatLng(lat, lng).then(
                    (response) => {
                        resolve(response.results[0].types)
                    },
                    (error) => {
                        reject(error)
                    }
                )
            })
        }
    }
}
const getDistanceAddress = (startAddress, destinationAddress) => {
    const distance = getDistance(
        { latitude: startAddress?.lat, longitude: startAddress?.lng },
        { latitude: destinationAddress.lat, longitude: destinationAddress.lng },
    ) / 1000
    return distance
}
const formatNumber = (numb, devise, local, isShort) => {
    if (numb) {
        let number = typeof numb === "number" ? numb : Number(numb?.replace(/\D/g, ''))
        if (isShort) {
            return `${Intl.NumberFormat('en', { notation: 'compact' }).format(number)} ${devise ? devise : ''}`
        } else {
            return `${number.toLocaleString(local)} ${devise ? devise : ''}`
        }
    }
}
const formatInputNumber = (number, local) => {
    const toNumber = typeof number === "number" ? number : Number(number.replace(/\D/g, ''));
    const parseNumber = parseInt(toNumber);
    const toLocale = parseNumber.toLocaleString(local);
    return toLocale
}
const jsonToFormData = (formData, data, parentKey) => {
    if (data && typeof data === 'object') {
        Object.keys(data).map(key => {
            jsonToFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
    }
    else if (data) {
        formData.append(parentKey, data);
    }
    return formData
}
export {
    renderError as viewError,
    renderLabel as viewLabel,
    renderInputObject,
    renderLabelObject,
    typeOfPlace as typeOfPlace,
    getTypeAddress as getTypeAddress,
    getDistanceAddress as getDistanceAddress,
    renderIconTooltipObject,
    formatNumber,
    jsonToFormData as jsonToFormData,
    formatInputNumber
}