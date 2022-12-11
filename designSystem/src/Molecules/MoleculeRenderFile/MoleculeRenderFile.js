import React, { useEffect, useState, Component } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { apiURL } from "../../config";
import { AuthStore } from "@easymo/auth"
import { Button, Img } from "../../Atoms";
import { OnHoverGrey, WhiteColor } from "../../Colors";
import translator from "../../lang/translator"
import { apiGetFileById } from "../../Api/Property";
import PropTypes from 'prop-types';
import { useReactToPrint } from "react-to-print";
MoleculeRenderFile.propTypes = {
    name: PropTypes.element.isRequired,
    type: PropTypes.element.isRequired
}
MoleculeRenderFile.defaultProps = {
    name: 'document',
    type: 'pdf',
}
function MoleculeRenderFile(props) {
    const componentRef = React.useRef(null);
    const onBeforeGetContentResolve = React.useRef(null);
    const [loading, setLoading] = React.useState(false);
    const [text, setText] = React.useState("old boring text");
    const handleAfterPrint = React.useCallback(() => {
    }, []);

    const handleBeforePrint = React.useCallback(() => {
    }, []);

    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current;
    }, [componentRef.current]);

    const handleOnBeforeGetContent = React.useCallback(() => {
        setLoading(true);
        setText("Loading new text...");

        return new Promise((resolve) => {
            onBeforeGetContentResolve.current = resolve;
            setTimeout(() => {
                setLoading(false);
                setText("New, Updated Text!");
                resolve();
            }, 2000);
        });
    }, [setLoading, setText]);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: "AwesomeFileName",
        onBeforeGetContent: handleOnBeforeGetContent,
        onBeforePrint: handleBeforePrint,
        onAfterPrint: handleAfterPrint,
        removeAfterPrint: true
    });

    const lang = translator("fr");
    const [uri, setUri] = useState(null)
    const getUrl = async () => {
        const agencyId = AuthStore?.getState()?.auth?.user?.agencyId
        const myUri = apiURL + "/api/fr/file/readDocument/" + props.fileId + '/' + agencyId
        setUri(myUri)
    }
    useEffect(() => {
        getUrl();
    }, [])
    const getClassName = () => {
        let className = "my-doc-viewer-style"
        if (props?.type?.toLowerCase() === "txt") {
            className = "txt-doc-viewer-style"
        }
        return className
    }
    const docs = [{ uri: uri }];
    const download = (fileUrl) => {
        var a = document.createElement("a");
        a.href = fileUrl;
        a.setAttribute("download", props?.name + '.' + props?.type);
        a.click();
    }
    const downloadFile = async () => {
        const response = await apiGetFileById(props?.fileId)
        download(response)
    }
    const renderImg = () => {
        return <div className="w-100 h-100 flex item-center justify-center" ref={componentRef}>
            <Img src={uri} className="mw-100" type="FUL" />
        </div>
    }
    const renderDocViewer = () => {
        return <DocViewer
            pluginRenderers={DocViewerRenderers}
            documents={docs}
            className={getClassName()}
            config={{
                header: {
                    disableHeader: true,
                    disableFileName: true,
                    retainURLParams: true
                }
            }}
            theme={{
                primary: WhiteColor,
                secondary: WhiteColor,
                tertiary: OnHoverGrey,
                text_primary: WhiteColor,
                text_tertiary: "red",
                disableThemeScrollbar: false,
            }}
        />;
    }
    const renderAction = () => {
        return <div className="flex justify-flex-end pt-4 pb-2">
            {["png", "jpeg", "jpg"].includes(props?.type?.toLowerCase()) && <Button className="mr-1" text={lang.print} onClick={handlePrint} withLoader loading={loading} />}
            < Button text={lang.download} onClick={() => downloadFile()} />
        </div>
    }
    const renderDoc = () => {
        if (uri) {
            if (["png", "jpeg", "jpg"].includes(props?.type?.toLowerCase())) {
                return renderImg()
            } else {
                return renderDocViewer()
            }
        }
        return null
    }
    return <>
        {renderDoc()}
        {uri && renderAction()}
    </>

}
export default MoleculeRenderFile