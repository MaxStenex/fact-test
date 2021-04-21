export const splitOnPrimitiveArrs = (arr: Array<any>) => {
  const result: Array<Array<any>> = [];

  // проходимся по всем элементам массива
  for (let i = 0; i < arr.length; i++) {
    let isPushed = false;
    const currentElement = arr[i];

    // идем по каждому подмассиву в результирующем массиве
    for (let j = 0; j < result.length; j++) {
      const firstElementOfArr = result[j][0];
      // если тип первого элемента исходного массива равен типу первого элемента подмассива
      if (typeof firstElementOfArr === typeof currentElement) {
        // если какой-либо из элементов равен null, а другой нет, то не пушим текущий элемент в подмассив
        // всё потому-что typeof null === 'object'
        if (
          (firstElementOfArr === null && currentElement !== null) ||
          (currentElement === null && firstElementOfArr !== null)
        ) {
          continue;
        }

        result[j].push(currentElement);
        isPushed = true;
      }
    }

    if (!isPushed) {
      result.push([currentElement]);
    }
  }

  return result;
};
