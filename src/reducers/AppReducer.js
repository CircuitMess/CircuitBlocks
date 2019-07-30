const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case "openAlert":
      return {
        ...state,
        isAlertOpen: true,
        alertText: action.payload.text
      };
    case "closeAlert":
      return {
        ...state,
        isAlertOpen: false
      };
    case "openModal":
      return {
        ...state,
        isModalOpen: true,
        modalType: action.payload.type,
        saveXml: action.payload.xml
      };
    case "closeModal":
      return {
        ...state,
        isModalOpen: false
      };
    case "toggleCode":
      return {
        ...state,
        isCodeOpen: !state.isCodeOpen
      };
    default:
      return state;
  }
};

export default reducer;
