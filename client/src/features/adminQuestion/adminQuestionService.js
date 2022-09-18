import axios from "axios";
import uniqid from "uniqid";
const getQuestion = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/admin/questions/" + id, config);

  const extendedQuestionData = response.data.options.map((element) => {
    return { id: uniqid(), defaultValue: element };
  });
  return { ...response.data, options: extendedQuestionData };
};

const adminQuistionService = {
  getQuestion,
};

export default adminQuistionService;
