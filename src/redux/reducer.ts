export function isauth(state: boolean = false, action: any) {
  switch (action.type) {
    case "AUTH":
      return (state = true);
    case "NOTAUTH":
      return (state = false);
    default:
      return state;
  }
}

export function DATA(state: any = { data: [], total_anime: 0 }, action: any) {
  switch (action.type) {
    case "INITIAL_DATA":
      return (state = {
        data: action.data.data.reverse(),
        total_anime: action.data.total_anime,
      });

    case "ADD_DATA":
      const ar1 = state.data.reverse();
      let ar2 = ar1.concat(action.data);
      return (state = {
        data: ar2.reverse(),
        total_anime: state.total_anime + 1,
      });

    case "DELETE_DATA":
      state.data.forEach((d: any, index: number) => {
        if (d._id === action.id) {
          state.data.splice(index, 1);
        }
      });
      return (state = { data: state.data, total_anime: state.total_anime - 1 });
    default:
      return state;
  }
}

export function USER(state = {}, action: any) {
  switch (action.type) {
    case "ADD_USER":
      return (state = action.user);
    default:
      return state;
  }
}
