import { Icon, SiderbarItemBlack, Tooltip, Dropdown, Button } from "@easymo/designSystem";
import moment from "moment";

const renderTableContact = (data, lang) => {
    let newData = data.filter((el, i) => i >= 2)
    let agentData = newData.map((el, i) => { return { text: (el.lastName + " " + el.firstName) } })
    return <>
        {
            data.map((el, index) => index < 2 &&
                <div className="flex agent-name-container">
                    <div className=" pointer" key={index}>
                        <Tooltip
                            backgroundColor={SiderbarItemBlack}
                            tooltipText={(el.lastName + " " + el.firstName)}
                            withIcon={false}
                            text={<div className="agent-name-truncate" > {(el.lastName + " " + el.firstName)} </div>}
                        />
                    </div>
                    {newData.length ? <span>,</span> : data.length === 2 && index !== 1 ? <span>,</span> : null}
                </div >
            )
        }
        <div className="flex">
            {
                newData.length
                    ?
                    <Dropdown
                        dropdownBtn="pl-0"
                        inTab
                        withStartIcon={false}
                        textclassName="autre-agent-text"
                        text={`+ ${newData.length} ${newData.length > 1 ? lang.autres : lang.autre}...`}
                        withEndIcon={false}
                        options={[{ details: [...agentData] }]}
                    />
                    :
                    null
            }
        </div>
    </>

}
const renderFile = (file, { onOpen = null, onAdd = null }) => {
    return <div className="flex justify-center item-center w-100">
        <div className="pointer file-icon-tab-container flex justify-center item-center">
            {file ? <Icon icon="document" className="file-upload-tab-icon"
                onClick={onOpen}
            /> :
                <Button
                    type='upload'
                    icon='publish'
                    className="btn-file-transaction"
                    iconClassName="m-0"
                    onChangeFile={onAdd}
                />
            }
        </div>
    </div>

}
const paginate = (array, page_size, page_number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}
const renderSurface = (e) => {
    if (e !== null || e !== "") {
        return `${e} m²`
    }
    return null
}
const renderPrice = (e, devise) => {
    return e + devise
}
const renderDateDayMonthYear = (date, language) => {
    return moment(date).locale(language).format("dddd Do MMMM  YYYY")
}
export {
    renderTableContact,
    renderFile,
    paginate,
    renderSurface,
    renderPrice,
    renderDateDayMonthYear
}