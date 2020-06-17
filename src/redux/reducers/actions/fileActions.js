
export const ADD_FILE = 'ADD_FILE';

export const addFile = (file) => {
    return {
        type: ADD_FILE,
        file
    }
}
