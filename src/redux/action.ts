export function auth() {
  return { type: "AUTH" };
}

export function notauth() {
  return { type: "NOTAUTH" };
}

export function initialData(datas: any) {
  return {
    type: "INITIAL_DATA",
    data: datas,
  };
}

export function add_data(datas: any) {
  return {
    type: "ADD_DATA",
    data: datas,
  };
}

export function delete_date(id: string) {
  return {
    type: "DELETE_DATA",
    id: id,
  };
}

export function userDetails(user: any) {
  return {
    type: "ADD_USER",
    user: user,
  };
}
