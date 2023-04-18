import React from 'react';
import File from './file/File'
import '../../../styles/fileList.scss'
import '../../../styles/app.scss'
import {useSelector} from 'react-redux'

const FileList = () => {

    const files = useSelector(state => state.files.files)
    const view = useSelector(state => state.files.view)
    console.log(files)

    if (files.length === 0) {
        return (
            <div className={'loader'}>The folder is empty</div>
        )
    }
    if (view === 'list') {
        return (
            <div className={'file-list'}>
                {files.map(file => <File key={file._id} file={file}/>)}
            </div>
        );
    }
    if (view === 'plate') {
        return (
            <div className={'file-plate'}>
                {files.map(file => <File key={file._id} file={file}/>)}
            </div>
        );
    }
};

export default FileList;