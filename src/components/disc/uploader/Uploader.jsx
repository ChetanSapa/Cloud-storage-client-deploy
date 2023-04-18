import React from 'react';
import '../../../styles/uploader.scss'
import UploadFile from './UploaderFile'
import {useSelector, useDispatch} from 'react-redux'
import {hideUploader} from '../../../reducers/uploadReducer'

const Uploader = () => {
    const files = useSelector(state => state.upload.files)
    const isVisible = useSelector(state => state.upload.isVisible)
    const dispatch = useDispatch()

    return (isVisible &&
        <div className={'uploader'}>
            <div className="uploader-header">
                <div className="uploader-header-title">Uploads</div>
                <button onClick={() =>dispatch(hideUploader())}>X</button>
            </div>
            {files.map(file =>
            <UploadFile key={file.id} file={file}/>
            )}
        </div>
    );
};

export default Uploader;