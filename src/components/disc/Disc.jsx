import {React, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getFiles, uploadFile} from '../../actions/file'
import FileList from './fileList/FileList'
import Popup from './Popup'
import Uploader from './uploader/Uploader'
import {setCurrentDir, setPopupDisplay, setView} from '../../reducers/fileReducer'
import {showLoader} from '../../reducers/appReducer'
import {searchFile} from '../../actions/file'
import '../../styles/disc.scss'
import '../../styles/loader.scss'

const Disc = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)
    const loader = useSelector(state => state.app.loader)
    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('type')
    const [searchValue, setSearchValue] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)

    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort])

    const popupHandler = () => {
        dispatch(setPopupDisplay('flex'))
    }
    const backClickHandler = () => {
        const backDir = dirStack.pop()
        dispatch(setCurrentDir(backDir))
    }
    const fileUploadHandler = (event) => {
        const files = [...event.target.files]
        console.log(files)
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    const drugEnterHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }
    const drugLeaveHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }
    const dropHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }
    const searchChangeHandler = (e) => {
        setSearchValue(e.target.value)
        if (searchTimeout != false) {
            clearTimeout(searchTimeout)
        }
        // dispatch(showLoader())
        if (e.target.value != '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(showLoader())
                dispatch(searchFile(value))
            }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }
    if (loader) {
        return (
            <div className={'loader'}>
                <div className="lds-dual-ring"></div>
            </div>
        )
    }
    return (
        <div className={'disc-page'}
             onDragEnter={drugEnterHandler}
             onDragLeave={drugLeaveHandler}
             onDragOver={drugEnterHandler}>
            <div className={"disc-nav"}>
                <button className={"disc-btn-back"} onClick={() => {backClickHandler()}}>{'<'}</button>
                <button className="disc-btn-create" onClick={() => popupHandler()}>Create</button>
                <div className={'disc-btn-upload'}>
                    <label htmlFor="uploadFile">Upload file</label>
                    <input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file"
                           id={'uploadFile'}/>
                </div>
                <div className="disc-select">
                    <span>Sort by:</span>
                    <select value={sort} onChange={e => setSort(e.target.value)}>
                        <option value="type">name</option>
                        <option value="name">type</option>
                        <option value="date">date</option>
                    </select>
                </div>
                {isAuth && <input
                    autoFocus
                    className={'search-input'}
                    value={searchValue}
                    onChange={e => searchChangeHandler(e)}
                    type="text"
                    placeholder={'Search...'}
                />}
                <div className="disc-view">
                    <button ><svg onClick={()=>dispatch(setView('list'))} width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <title/>
                        <g id="Complete">
                            <g id="align-justify">
                                <g>
                                    <polygon fill="#ffffff" points="20 18 4 18 4 18 20 18 20 18" stroke="#000000" strokeLinecap="round"
                                             strokeLinejoin="round" strokeWidth="2"/>
                                    <polygon fill="#ffffff" points="20 14 4 14 4 14 20 14 20 14" stroke="#000000" strokeLinecap="round"
                                             strokeLinejoin="round" strokeWidth="2"/>
                                    <polygon fill="#ffffff" points="20 10 4 10 4 10 20 10 20 10" stroke="#000000" strokeLinecap="round"
                                             strokeLinejoin="round" strokeWidth="2"/>
                                    <polygon fill="#ffffff" points="20 6 4 6 4 6 20 6 20 6" stroke="#000000" strokeLinecap="round"
                                             strokeLinejoin="round" strokeWidth="2"/>
                                </g>
                            </g>
                        </g>
                    </svg></button>
                    <button ><svg onClick={()=>dispatch(setView('plate'))} width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <title/>
                        <g id="Complete">
                            <g id="grid">
                                <g>
                                    <rect fill="none" height="7" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" width="7" x="14.5" y="2.5"/>

                                    <rect fill="none" height="7" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" width="7" x="14.5" y="14.5"/>

                                    <rect fill="none" height="7" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" width="7" x="2.5" y="2.5"/>

                                    <rect fill="none" height="7" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" width="7" x="2.5" y="14.5"/>

                                </g>
                            </g>
                        </g>
                    </svg></button>
                </div>
            </div>
            {!dragEnter ?
                <FileList/>
                :
                <div className={'drop-area'}
                     onDrop={dropHandler}
                     onDragEnter={drugEnterHandler}
                     onDragLeave={drugLeaveHandler}
                     onDragOver={drugEnterHandler}>
                    Drop file here
                </div>
            }

            <Popup/>
            <Uploader/>
        </div>

    );
};

export default Disc;