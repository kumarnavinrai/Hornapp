export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const HORN_ITEM = 'HORN_ITEM'


export const addItem = item => ({
  type: ADD_ITEM,
  payload: item
})

export const removeItem = id => ({
  type: REMOVE_ITEM,
  payload: id
})

export const hornItem = uri => ({
  type: HORN_ITEM,
  payload: uri
})

const initialState = {
  itemList: []
}

const rootReducer = (state = initialState, action) => { console.log(state);
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        itemList: state.itemList.concat({
          id: Math.random(),
          name: action.payload
        })
      }
    case HORN_ITEM:
      return {
        ...state,
        itemList: { id: Math.random(), uri: action.payload }
      }  
    case REMOVE_ITEM:
      return {
        ...state,
        itemList: state.itemList.filter(item => item.id !== action.payload)
      }

    default:
      return state
  }
}

export default rootReducer
