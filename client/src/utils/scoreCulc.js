export const scoreCulc = (result, answers) => {
  if (answers.length === 0) {
    return 0;
  }
  if (answers.length > 0) {
    return Number.parseInt(
      ((Number.parseInt(result) / answers.length) * 100).toFixed(0)
    );
  }
};
