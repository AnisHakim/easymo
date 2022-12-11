import { listNavMedias } from "../../data/data"

const getIcon = (index, element) => {
    if (element.public)
        return "visible_outlined"
    return "hidden_outlined"
}
const getstate = (lang) => {
    return {
        isOpenCrop: false,
        isImageEdit: false,
        listNavMedia: listNavMedias(lang),
        selectedNavItem: 0,
        videoLink: {
            value: '',
            isValid: false,
            isInValid: false,
            errorMessage: ''
        },
        openModal: false,
        isUpdated: false,
        videoToEdit: {},
        indexVideo: 0,
        listVideo: [],
        images: [],
        listVisite: [],
        listImg: [],
        listImgToCrop: [],
        listImgDeleted: [],
        listAction: [
            {
                colClassName: 'border-right-media',
                tooltipText: lang.tooltipMediaInfo,
                icon: "info_outined",
                onClick: "edit",
                iconClassname: 'tooltip-icon-media'
            },
            {
                colClassName: 'border-right-media',
                tooltipText: lang.public,
                onClick: "public",
                iconClassname: 'tooltip-icon-media'
            },
            {
                tooltipText: lang.btnDeleted,
                icon: "delete_outlined",
                onClick: "delete",
                iconClassname: 'tooltip-icon-media-delete'
            },
        ]
    }
}
const fommatElementData = (propertie, key) => {
    return propertie?.media[key]?.map(el => {
        return {
            videoLink: el.uri,
            videoName: {
                value: el.name,
                isValid: false,
                isInValid: false,
                errorMessage: '',
            },
            socialNetworks: el.DiffusionSocialMedia,
            linkAgent: el.DiffusionSite,
            RealEstatePlatforms: el.DiffusionPlatform,
            public: el.isPublic,
        }
    })
}
const defineElementPost = (list) => {
    return list?.map(el => {
        return {
            "uri": el.videoLink,
            "name": el.videoName.value,
            "isPublic": el.public,
            "DiffusionSite": el.linkAgent,
            "DiffusionPlatform": el.RealEstatePlatforms,
            "DiffusionSocialMedia": el.socialNetworks
        }
    })
}
const getImageSrc = (image) => {
    return image
}
export {
    getIcon,
    getstate,
    fommatElementData,
    defineElementPost,
    getImageSrc
}