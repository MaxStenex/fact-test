export const flatArray = (arr: Array<any>, result: Array<any> = []) => {
  for (let i = 0; i < arr.length; i++) {
    const currElem = arr[i];
    if (Array.isArray(currElem)) {
      flatArray(currElem, result);
    } else {
      result.push(currElem);
    }
  }

  return result;
};
