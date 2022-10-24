export const initialState = {
  dataList: [],
  filter: false,
  total: 0,
  refetch: null,
};

export const reducer = (state, action) => {
  console.log('refetchToggle1', state.refetchToggle);
  switch (action.type) {
    case 'setDataList':
      return { ...state, dataList: action.payload };
    case 'setFilter':
      return { ...state, filter: action.payload };
    case 'setTotal':
      return { ...state, total: action.payload };
    case 'setRefetch':
      return { ...state, refetch: action.payload };
    default:
      return state;
  }
};
