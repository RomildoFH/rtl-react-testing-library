function removeDuplicates(array) {
  const filtredTypes = [];
  array.forEach((element) => {
    if (!filtredTypes.includes(element.type)) {
      filtredTypes.push(element.type);
    }
  });
  return filtredTypes;
}

export default removeDuplicates;
