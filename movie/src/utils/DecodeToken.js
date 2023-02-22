import jwt_decode from "jwt-decode";
import claimTypes from "claimtypes";

const initialUser = {
  userName: "",
  role: "",
};

function DecodeToken(token) {
  if (token === undefined) {
    return initialUser;
  }
  try {
    var decoded = jwt_decode(token);
    var user = {
      userName: decoded[claimTypes.nameIdentifier],
      role: decoded[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ],
    };
  } catch {
    user = initialUser;
  }
  return user;
}

export { DecodeToken, initialUser };
