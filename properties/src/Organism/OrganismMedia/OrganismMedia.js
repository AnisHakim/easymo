import React, { useEffect, useState } from "react";
import {
  Collapse,
  TransactionNav,
  MoleculeInput,
  Button,
  isUrl,
  isYoutubeLink,
  youtubeLinkEmbed,
  vimeoLinkEmbed,
  MoleculeDragUpload,
  isVimeoLink
} from "@easymo/designSystem";
import translator from "../../lang/translator";
import { imgMedia, imgVirtual } from "../../Modal/svg/svg";
import ModalAddVideo from "../../Modal/ModalAddVideo/ModalAddVideo";
import CardVideo from "./CardVideo";
import {
  defineElementPost,
  fommatElementData,
  getIcon,
  getImageSrc,
  getstate,
} from "./common";
import { apiUpdateMedia } from "../../Api/Properties/properties";
import { apiGetFile } from "../../Api/File";
import { ReactSortable } from "react-sortablejs";
const lang = translator("fr");
const OrganismMedia = (props) => {
  const [state, setState] = useState({
    ...getstate(lang),
  });
  const getList = () => {
    if (state.selectedNavItem === 0) return "listImg";
    if (state.selectedNavItem === 1) return "listVideo";
    else if (state.selectedNavItem === 2) return "listVisite";
  };
  const setIsUpdated = () => {
    setState({
      ...state,
      isUpdated: true,
    });
  };
  const onClickNavItem = (index) => {
    let newlist = state.listNavMedia.map((el) => {
      return { ...el, isActive: false };
    });
    newlist[index].isActive = true;
    setState({
      ...state,
      listNavMedia: newlist,
      selectedNavItem: index,
      videoLink: {
        value: "",
        isValid: false,
        isInValid: false,
        errorMessage: "",
      },
    });
  };
  const removeElement = (index) => {
    const list = [...state.listImgDeleted];
    if (state.selectedNavItem === 0) {
      if (state.listImg[index].imgId) {
        list.push(state.listImg[index].imgId);
      }
    }
    let data = [...state[getList()]];
    data = data.filter((el, idx) => idx !== index);
    setState({
      ...state,
      isUpdated: true,
      listImgDeleted: list,
      [getList()]: data,
    });
  };
  const formatImageData = (list) => {
    const listImage = [];
    const images = [];
    for (let index = 0; index < list?.length; index++) {
      const el = list[index];
      const exist = state.listImg.filter(
        (element) => el.imgId === element.imgId
      );
      images.push(el.imgId);
      listImage.push({
        image: exist.length > 0 ? exist[0].image : null,
        image64: null,
        videoName: {
          value: el.name,
          isValid: false,
          isInValid: false,
          errorMessage: "",
        },
        description: {
          value: el.description,
          isValid: false,
          isInValid: false,
          errorMessage: "",
        },
        socialNetworks: el.DiffusionSocialMedia,
        linkAgent: el.DiffusionSite,
        RealEstatePlatforms: el.DiffusionPlatform,
        public: el.isPublic,
        imgId: el.imgId,
        isFeatured: el.isFeatured,
      });
    }
    return { listImage, images };
  };
  const formatdata = async () => {
    if (props.propertie) {
      if (props.propertie.media) {
        let listVideos = [];
        let listVirtualTours = [];
        listVideos = fommatElementData(props.propertie, "listVideos");
        listVirtualTours = fommatElementData(
          props.propertie,
          "listVirtualTours"
        );
        let listImages = [];
        let lImages = [];
        if (props.propertie.media.listImage) {
          const { listImage, images } = formatImageData(
            props.propertie.media.listImage
          );
          lImages = images;
          listImages = listImage;
        }
        setState({
          ...state,
          images: lImages,
          listVideo: listVideos,
          listVisite: listVirtualTours,
          listImg: listImages,
        });
      }
    }
  };
  async function getListImages(isOpenCrop) {
    for (let index = 0; index < state.images.length; index++) {
      const list = [...state.listImg];
      if (!list[index].image) {
        const el = state.images[index];
        apiGetFile(el).then(file => {
          try {
            const response = file.json()
          } catch (error) {
            list[index].image = file;
            setState({
              ...state,
              listImg: list,
            });
          }
        })
      }
    }
  }
  useEffect(() => {
    if (props.images) {
      updateImageVedettte();
    }
  }, [props.images]);
  const updateImageVedettte = async () => {
    let newState = { ...state };
    const newImage = await apiGetFile(props.images._id);
    const image = {
      ...props.images,
      image: newImage,
      isFeatured: true,
    };
    const list = state.listImg.map((el) => {
      return { ...el, isFeatured: false };
    });
    newState.listImg = [...list, image];
    setState(newState);
  };
  useEffect(() => {
    if (state.images.length) {
      getListImages();
    }
  }, [state.images]);
  const addVideo = () => {
    if (state.videoLink.value !== "") {
      const data = [...state[getList()]];
      let videoLink = { ...state.videoLink };
      let videoUrl = state.videoLink.value;
      let isUpdated = state.isUpdated;
      if (isUrl(videoUrl)) {
        if (isYoutubeLink(state.videoLink.value)) {
          videoUrl = youtubeLinkEmbed(state.videoLink.value);
        } else if (isVimeoLink(state.videoLink.value)) {
          videoUrl = vimeoLinkEmbed(state.videoLink.value);
        }
        videoLink.value = "";
        videoLink.isInValid = false;
        videoLink.errorMessage = "";
        data.push({
          videoLink: videoUrl,
          videoName: {
            value: "",
            isValid: false,
            isInValid: false,
            errorMessage: "",
          },
          socialNetworks: false,
          linkAgent: false,
          RealEstatePlatforms: false,
          public: true,
        });
        isUpdated = true
      } else {
        videoLink.isInValid = true;
        videoLink.errorMessage = lang.uriError;
      }
      setState({
        ...state,
        [getList()]: data,
        videoLink: videoLink,
        isUpdated: isUpdated
      });
    }
  };
  const submit = async () => {
    props.setLoader(true);
    const listVideoBody = defineElementPost(state.listVideo);
    const listVirtualTours = defineElementPost(state.listVisite);
    const listImage = state.listImg.map((el) => {
      return {
        imgId: el?.imgId,
        image: el?.image,
        name: el?.videoName?.value,
        description: el?.description?.value,
        isPublic: el?.public,
        isFeatured: el?.isFeatured,
        DiffusionSite: el?.linkAgent,
        DiffusionPlatform: el?.RealEstatePlatforms,
        DiffusionSocialMedia: el?.socialNetworks,
      };
    });
    const body = {
      id: props.propertie.id ? props.propertie.id : props.propertie._id,
      listVideos: listVideoBody,
      listVirtualTours: listVirtualTours,
      listImage: listImage,
      listImgDeleted: state.listImgDeleted,
    };
    const response = await apiUpdateMedia(JSON.stringify(body));
    if (response.statusCode === 200) {
      props.dataUpdated("Media");
      const { listImage, images } = formatImageData(
        response.data.media.listImage
      );
      setState({
        ...state,
        isUpdated: false,
        listImg: listImage,
        images: images,
      });
    } else {
      props.setLoader(false);
    }
  };
  const removeElementFromModal = (index) => {
    let data = [...state[getList()]];
    data = data.filter((el, idx) => idx !== index);
    removeElement(index);
    setState({
      ...state,
      openModal: false,
      [getList()]: data,
    });
  };
  const getDataFromModal = (data) => {
    setState({
      ...state,
      openModal: false,
      [getList()]: [...data],
    });
  };
  const editVideo = (idx, element) => {
    setState({
      ...state,
      isImageEdit: state.selectedNavItem === 0,
      openModal: true,
      videoToEdit: element,
      indexVideo: idx,
    });
  };
  const changePublic = (idx) => {
    const newData = [...state[getList()]];
    newData[idx].public = !newData[idx].public;
    setState({
      ...state,
      isUpdated: true,
      [getList()]: newData,
    });
  };
  const onChangeLink = (e) => {
    setState({
      ...state,
      videoLink: {
        ...state.videoLink,
        value: e.target.value,
        isInValid: false,
        errorMessage: "",
      },
    });
  };
  useEffect(() => {
    if (state.isUpdated) submit();
  }, [props.isCallAPi]);
  useEffect(() => {
    formatdata();
  }, [props.isPropertieLoaded]);

  const onClick = (index, el, e) => {
    switch (e) {
      case "edit":
        editVideo(index, el);
        break;
      case "public":
        changePublic(index);
        break;
      case "delete":
        removeElement(index);
        break;
      default:
        break;
    }
  };
  const checkBefore = (e) => {
    let isUpdated = state.isUpdated
    if (!isUpdated) {
      if (JSON.stringify(e) !== JSON.stringify(state[getList()]))
        isUpdated = true
    }
    return isUpdated
  }
  const moveCardImg = (e) => {
    setState({
      ...state,
      isUpdated: checkBefore(e),
      [getList()]: e
    })
  }
  const moveCard = (e) => {
    setState({
      ...state,
      isUpdated: checkBefore(e),
      [getList()]: e.filter(el => el)
    })
  }
  const handleClickIcon = (index) => {
    let data = [...state[getList()]]
    if (getList() === 'listImg') {
      let arr = []
      arr = data.map((el, i) => { return { ...el, isFeatured: i === index } })
      setState({
        ...state,
        isUpdated: true,
        [getList()]: arr
      })
      props.updateHederFeatired && props.updateHederFeatired(arr[index])
    } else {
      data[index].isFeatured = !data[index].isFeatured
      setState({
        ...state,
        isUpdated: true,
        [getList()]: data
      })
    }
  }
  const uploadFile = async (e) => {
    const list = [...state.listImg]
    let arr = []
    let files = Array.from(e).map(file => {
      let reader = new FileReader();
      return new Promise(resolve => {
        reader.onload = () => resolve(reader.result);
        arr.push(reader.readAsDataURL(file));
      });
    });
    const res = await Promise.all(files);
    for (let index = 0; index < res.length; index++) {
      list.push({
        image: res[index],
        videoName: {
          value: "",
          isValid: false,
          isInValid: false,
          errorMessage: '',
        },
        description: {
          value: "",
          isValid: false,
          isInValid: false,
          errorMessage: '',
        },
        socialNetworks: false,
        linkAgent: false,
        RealEstatePlatforms: false,
        public: true,
        imgId: null,
        isFeatured: false,
      })
    }
    setState({
      ...state,
      listImg: list,
      isUpdated: true,
    })
  }
  const renderCardAddVideo = () => {
    return <div className="card-media">
      <div className="pt-6 pb-4 text-center card-img-media w-100">
        <div className="img-media mt-6 mb-3">
          {state.selectedNavItem === 1 ? imgMedia : imgVirtual}
        </div>
      </div>
      <div className="p-5  text-center">
        <label className="label-media mb-3">
          {state.selectedNavItem === 1
            ? lang.labelVideoMedia
            : lang.labelVirtualVisit}
        </label>
        <div className="flex w-100">
          <MoleculeInput
            containerClassName="w-100"
            inputClassname="input-media"
            inputLabel=""
            onchangeInput={(e) => onChangeLink(e)}
            inputValue={state.videoLink.value}
            placeholder={
              state.selectedNavItem === 1
                ? "www.youtube.com/watch?v=EbNZucXdiyc"
                : "my.matterport.com/show/?m=1gi9PPa1Yvq"
            }
            isValid={state.videoLink.isValid}
            isInvalid={state.videoLink.isInValid}
            inputError={state.videoLink.errorMessage}
            errorClassname="error-msg-inputs text-left"
          />
          <Button
            icon={
              state.selectedNavItem === 1
                ? "video-solid"
                : "street-view"
            }
            text={lang.add}
            type="secondary"
            className="button-media"
            onClick={() => addVideo()}
          />
        </div>
      </div>
    </div>
  }
  return <>
    {state.openModal && <ModalAddVideo
      show={state.openModal}
      setOpenModal={() => setState({ ...state, openModal: false })}
      selectedNavItem={state.selectedNavItem}
      videoToEdit={state.videoToEdit}
      indexVideo={state.indexVideo}
      getDataFromModal={getDataFromModal}
      setIsUpdated={setIsUpdated}
      removeElementFromModal={removeElementFromModal}
      listToEdit={state[getList()]}
      isImageEdit={state.isImageEdit}
    />}
    <Collapse title={lang.Médias} iconStart="photo_gallery">
      <div className="row">
        <div className="col-sm-12 mb-7">
          <TransactionNav
            listNav={state.listNavMedia}
            onClickNavItem={(index) => onClickNavItem(index)}
          />
        </div>
      </div>
      {state.selectedNavItem === 0 && (
        <ReactSortable list={state.listImg} setList={moveCardImg} className="row">
          {state.listImg.map((el, index) => (
            <CardVideo
              className="col-sm-4 col-md-3 mb-3"
              imgCard el={el} index={index}
              id={getList() + index} listAction={state.listAction} getIcon={(index, el) => getIcon(index, el)} onClick={onClick}
              src={getImageSrc(el.image)} handleClickIcon={() => handleClickIcon(index)} isFeatured={el.isFeatured}
            />
          ))}
          <MoleculeDragUpload buttonType="primary" isDocument={false} uploadFile={uploadFile} accept={"image/*"}
          />
        </ReactSortable>
      )}
      {state.selectedNavItem !== 0 && (
        <ReactSortable list={state[getList()]} setList={moveCard} className="row flex flex-wrap w-100">
          <>
            {state[getList()].map((el, index) => (
              <CardVideo el={el} index={index} id={getList() + index} listAction={state.listAction} getIcon={(index, el) => getIcon(index, el)}
                className="col-md-6 mb-5" onClick={onClick} />
            ))}
            <div className="col-md-6" draggable={false} ondragstart="return false;" ondrop="return false;">
              {renderCardAddVideo()}
            </div>
          </>
        </ReactSortable>
      )}
    </Collapse>

  </>
}
export default OrganismMedia;
