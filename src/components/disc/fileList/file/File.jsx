import React from 'react';
import '../../../../styles/file.scss'
import folderImg from '../../../../assets/folder.png'
import fileImg from '../../../../assets/file.png'
import {useDispatch, useSelector} from 'react-redux'
import {setCurrentDir, pushToStack} from '../../../../reducers/fileReducer'
import {downloadFile, deleteFile} from '../../../../actions/file'
import sizeFormat from '../../../../utils/sizeFormat'


const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const view = useSelector(state => state.files.view)
    const openDirHandler = (file) => {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }
    const downloadFileHandler = (e) => {
        e.stopPropagation()
        downloadFile(file)
    }
    const deleteClickHandler = (e) => {
        e.stopPropagation()
        console.log(file)
        dispatch(deleteFile(file))
    }
    if (view === 'list'){
        return (
            <div className={'file'}>
                <div className="file-title">
                    <img src={file.type === 'dir' ? folderImg : fileImg} alt={file.name}/>
                    <div className={file.type === 'dir' ? 'file-title-name-dir' : 'file-title-name-file'}
                         onClick={() => openDirHandler(file)}
                    >{file.name}</div>
                </div>
                <div className="func-btn">
                    {file.type !== 'dir' && <button onClick={(e) => downloadFileHandler(e)} className="func-btn-download">Download</button>}
                    <button onClick={(e)=>deleteClickHandler(e)} className="func-btn-delete">Delete</button>
                </div>
                <div className="file-info">
                    <div className="file-info-date">{file.date.slice(0, 10)}</div>
                    <div className="file-info-size">{sizeFormat(file.size)}</div>
                </div>
            </div>
        );
    }
    if (view === 'plate'){
        return (
            <div className={'file-view-plate'}>
                <div className="file-title">
                    <img onClick={() => openDirHandler(file)} src={file.type === 'dir' ? folderImg : fileImg} alt={file.name}/>
                    <div className={file.type === 'dir' ? 'file-title-name-dir' : 'file-title-name-file'}
                         // onClick={() => openDirHandler(file)}
                    >{file.name}</div>
                </div>
                <div className="func-btn">
                    {file.type !== 'dir' && <button onClick={(e) => downloadFileHandler(e)} className="func-btn-download">Download</button>}
                    <button onClick={(e)=>deleteClickHandler(e)} className="func-btn-delete">Delete</button>
                </div>
            </div>
        );
    }
};

export default File;