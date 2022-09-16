export const checkedElementIdExtractor = (options, currect) => {
  let result = "there is no right answer";
  if (currect.length > 0) {
    result = options[parseInt(currect[0])].id;
  }
  return result;
};
