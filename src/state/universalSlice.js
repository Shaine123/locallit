import {createSlice} from '@reduxjs/toolkit'

const universalSlice = createSlice({
  name: 'universal',
  initialState: {
     status:'logout',
     addModalState: false,
     deleteModalState: false,
     editModalState: false,
     summaryModalState: false,
     universalModalState: false,
     successModal: false,
  },
  reducers: {
    openModalAdd: (state, {payload}) => {
       state.addModalState = !state.addModalState
    },
   openModalDelete: (state, {payload}) => {
      state.deleteModalState = !state.deleteModalState
   },
    openModalEdit: (state, {payload}) => {
    state.editModalState = !state.editModalState
   },
   openSummaryModal: (state, {payload}) => {
    state.summaryModalState = !state.summaryModalState
   },
   openSuccessModal: (state, {payload}) => {
       state.successModal = !state.successModal
   },
   openUniversalModal: (state, {payload}) =>{
      state.universalModalState = !state.universalModalState
   }
 }
})

export const {openModalAdd,openModalDelete,openModalEdit,openSuccessModal,openSummaryModal,openUniversalModal} = universalSlice.actions

export default universalSlice.reducer