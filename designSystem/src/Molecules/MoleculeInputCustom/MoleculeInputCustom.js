import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import propTypes from 'prop-types';

MoleculeInputCustom.propTypes = {
    value: propTypes.string,
    placeholder: propTypes.string,
    onChange: propTypes.any,
    readOnly: propTypes.bool,
    className: propTypes.string
};
MoleculeInputCustom.defaultProps = {
    value: '',
    onChange: null,
    placeholder: 'placeholder',
    readOnly: false,
    className: ''
};
var toolbarOptions = ['bold', 'italic', 'underline', 'strike', 'link', 'image', 'blockquote', 'code', { 'list': 'bullet' }];

function MoleculeInputCustom(props) {
    let classname = 'default-input-custom ' + props.className
    return (
        <ReactQuill
            theme="snow"
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            modules={
                { toolbar: toolbarOptions }
            }
            className={classname}
            readOnly={props.readOnly}
        />
    )
}

export default MoleculeInputCustom
