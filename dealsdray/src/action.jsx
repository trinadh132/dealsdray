const add="Add objects";
const update="update objects";
const remove ="remove objects"


const ad=(id,obj)=>{
    return{
    type:add,
    payload:{id,obj}
};};

const up = (id,obj)=>{
    return{
    type:update,
    payload:{id,obj}
};};
const rem = obj=>{
  return{
  type:remove,
  payload:obj
};};

const initialState = {
  items: {},
};

const objectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case add:
      return {
        ...state,
        items: {...state.items,[action.payload.id]: action.payload.data },
      };
    case update:
      return {
        ...state,
        items: {...state.items, [action.payload.id]: action.payload.data },
      };
      case remove:
        const idToRemove = action.payload;
        const { [idToRemove]: _, ...newObjectsById } = state.items;
      return {
        ...state,
        items: newObjectsById,
      };
    default:
      return state;
  }
};

export  {objectsReducer,ad,up,rem};