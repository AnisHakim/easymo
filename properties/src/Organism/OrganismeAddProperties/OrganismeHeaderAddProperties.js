import translator from "../../lang/translator"
import { Button, MoleculeHeader, TextIcon, Text } from "@easymo/designSystem";
import { useNavigate } from "react-router-dom";
import moment from 'moment'
import { useEffect } from "react";

function OrganismeHeaderAddProperties(props) {
    const lang = translator('fr')
    const language = 'fr'
    const navigation = useNavigate()
    return (
        <div className="add-propriete-header-container mb-5" >
            <div className="flex item-center properties-header-container" >
                <MoleculeHeader text={[{ text: lang.Propriétés }, { text: lang.vueEnsemble, link: "/properties" }, { text: lang.ajouterBien }]}
                    pageTitle={props.propertie?.name ? props.propertieName : props.showAddPropertie ? lang.ajouterBien : ''} navigation={navigation} showLoading />
                <Button containerClassName='new-propriete-btn add' text={lang.nvBien} icon='add_property' onClick={props.showAddModal} />
            </div>
            <div className="flex justify-start header-propriete-info" >
                <TextIcon iconStart='user' iconStartClass='mr-1 iconStartClass' textclassName='font-size-sm'
                    withStartIcon={true} text={`${lang.ajoutéPar} `} />
                <TextIcon textclassName='font-size-sm capitalize'
                    withStartIcon={true} showLoading text={props.propertie?.createdBy?.firstName && ` ${props.propertie?.createdBy?.firstName} - ${moment(props.propertie?.createdAt).locale(language).format('LL')}, ${moment(props.propertie?.createdAt).locale(language).format('HH')}h${moment(props.propertie?.createdAt).locale(language).format('mm')}`} />
            </div>
            <div className="flex justify-start item-center header-propriete-info" >
                <TextIcon iconStart='history' iconStartClass='mr-1 iconStartClass' textclassName='font-size-sm'
                    withStartIcon={true} text={`${lang.modifiéPar}`} />
                <div className="flex modification-agent" >
                    <Text className="font-size-sm mb-0  capitalize" showLoading text={props.propertie?.updatedBy?.firstName && ` ${props.propertie?.updatedBy?.firstName}`} />


                    <Text onClick={props.onToggleHistoriqueModal} className="font-size-sm mb-0  ml-1" showLoading text={props.propertie?.updatedBy?.firstName && `- ${moment(props.propertie?.updatedAt).locale(language).format('LL')}, ${moment(props.propertie?.updatedAt).locale(language).format('HH')}h${moment(props.propertie?.updatedAt).locale(language).format('mm')}`} />


                </div>
            </div>
        </div>
    )
}

export default OrganismeHeaderAddProperties
