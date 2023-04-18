import React from 'react';
import {useDispatch} from 'react-redux'
import '../../../styles/uploader.scss'
import {removeUploadFile} from '../../../reducers/uploadReducer'

const UploaderFile = ({file}) => {
    const dispatch = useDispatch()
    return (
        <div className={'uploader-file'}>
            <div className="uploader-file-title">
                <div className="uploader-file-name">{file.name}</div>
                <button onClick={()=> dispatch(removeUploadFile(file.id))}>X</button>
            </div>
            <div className="uploader-file-progress-bar">
                <div className="uploader-file-progress" style={{width: file.progress + '%'}}/>
                <div className={file.progress < 51 ? "uploader-file-percent" : "uploader-file-percent-over"}>{file.progress} %</div>
            </div>
        </div>
    );
};

export default UploaderFile;