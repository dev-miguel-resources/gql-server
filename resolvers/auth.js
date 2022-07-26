const { authCheck } = require("../middlewares/auth");

const me = async (parent, args, { req, res }) => {
  await authCheck(req, res);
  return "Miguel";
};

module.exports = {
  Query: {
    me,
  },
  Mutation: {
    
  }
}


