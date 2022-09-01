export const scoreCulc = (result, answers) =>
  ((Number.parseInt(result) / Number.parseInt(answers.length)) * 100).toFixed(
    0
  );
