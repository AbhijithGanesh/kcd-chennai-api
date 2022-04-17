let check = (Obj: Array<String>, Val: String) => {
  let flag: boolean = false;
  for (let i = 0; i < Obj.length; i++) {
    if (Obj[i] == Val) {
      flag = true;
      break;
    }
  }
  return flag;
};
export default check;
