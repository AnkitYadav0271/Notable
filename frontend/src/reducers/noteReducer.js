

export const noteReducer = (state,action)=>{

    switch(action.type){
        case "addNote":{
            return [...state,{note}];
        }

        case "deleteNode":{
            return[(state.map((note)=> note.id != state.note.id))];
        }
    }
}