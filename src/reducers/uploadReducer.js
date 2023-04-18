const SHOW_UPLOADER = 'SHOW_UPLOADER'
const HIDE_UPLOADER = 'HIDE_UPLOADER'
const ADD_UPLOAD_FILE = 'ADD_UPLOAD_FILE'
const REMOVE_FILE = 'REMOVE_FILE'
const CHANGE_UPLOAD_PROGRESS = 'CHANGE_UPLOAD_PROGRESS'

const defaultState = {
    isVisible: false,
    files: []
}

export const uploadReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SHOW_UPLOADER:
            return {...state, isVisible: true}
        case HIDE_UPLOADER:
            return {...state, isVisible: false}
        case ADD_UPLOAD_FILE:
            return {...state, files: [...state.files, action.payload]}
        case REMOVE_FILE:
            return {...state, files: [...state.files.filter(file => file.id != action.payload)]}
        case CHANGE_UPLOAD_PROGRESS:
            return {
                ...state,
                files: [...state.files.map(file => file.id == action.payload.id
                    ? {...file, progress: action.payload.progress}
                    : {...file}
                )]
            }
        default:
            return state
    }
}

export const showUploader = () => ({type: SHOW_UPLOADER})
export const hideUploader = () => ({type: HIDE_UPLOADER})
export const addUploadFile = (file) => ({type: ADD_UPLOAD_FILE, payload: file})
export const removeUploadFile = (fileId) => ({type: REMOVE_FILE, payload: fileId})
export const changeUploadProgres = (payload) => ({type: CHANGE_UPLOAD_PROGRESS, payload: payload})