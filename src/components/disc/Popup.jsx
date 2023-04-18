import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {setPopupDisplay} from '../../reducers/fileReducer'
import {createDir} from '../../actions/file'

const Popup = () => {
    const [dirName, setDirName] = useState('')
    const popupDisplay = useSelector(state => state.files.popupDisplay)
    const currentDir = useSelector(state => state.files.currentDir)
    const dispatch = useDispatch()
    const createDirHandler = () => {
        dispatch(createDir(currentDir, dirName))
        setDirName('')
        dispatch(setPopupDisplay('none'))
    }
    return (
        <div className={'popup'} onClick={() => dispatch(setPopupDisplay('none'))} style={{display: popupDisplay}}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <div className="popup-title">New directory</div>
                    <button className={'popup-close'} onClick={() => dispatch(setPopupDisplay('none'))}>X</button>
                </div>
                <input type="text" placeholder={'Name...'} value={dirName} onChange={(e) => setDirName(e.target.value)}
                       autoFocus={true}/>
                <button onClick={() => createDirHandler()}>Create</button>
            </div>
        </div>
    );
};

export default Popup;