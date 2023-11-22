import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const stepSlice = createSlice({
  name: "step",
  initialState: [],
  reducers: {
    deleteStepReducer: (state, id) => {
      // console.log("delete step", id);
      state.filter((step) => step.id !== id);
    },

    addStepReducer: (state, action) => {
      console.log("action", action);

      const newStep = {
        project: '',
        id: uuidv4(),
        date: new Date(),
        parent: action.payload.parent, 
        completed: false,
      };
      // console.log('newStep', newStep);
      state.push(newStep);
    },

    // text: state => {
    // update state.project with what user is typing
    // find by a specific ID in an aray of objects
    //find index
    // },

    // stepAdded: (state, action) => {
    //     state.push({
    //         project: action.payload.project,
    //         id: uuid,
    //         date: new Date(),
    //         parent: projectData.id,
    //         completed: false
    //     })
    // },

    //break it down
    // step added; steps added
  },
});

/* ACTIONS 
- createStep() --> create a new step manually 
- deleteStep() --> delete a step by user clicking X 
- breakItDown() --> adds multiple steps when user clicks button 
- Alter text in steps --> user can change text in a step
*/

// Action creators are generated for each case reducer function
export const { deleteStepReducer, addStepReducer } = stepSlice.actions;

export default stepSlice.reducer;
