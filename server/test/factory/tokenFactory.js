const fs = require("fs");

const { getToken } = require("../../helpers");

const [admin, cust] = JSON.parse(fs.readFileSync("./data/user.json", "utf-8"));

const admin_token = getToken({
  email: admin.email,
  role: admin.role,
});

const cust_token = getToken({
  email: cust.email,
  role: cust.role,
});

module.exports = {
  admin_token,
  cust_token,
  cust2_token,
};
