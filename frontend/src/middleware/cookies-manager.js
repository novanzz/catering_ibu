import Cookies from "js-cookie"

//post token

const setCookies = async (token) => {
    // 7 jam kurang
    await Cookies.set("auth", token ,{ expires: new Date(Date.now() + 26500000) })
};

const getToken = ()=>{
  const authToken = Cookies.get("auth");
  return authToken
}

const tokenAuthenticated = () => {
    const authToken = Cookies.get("auth");
    if (authToken) {
      return {
        authToken: true,
      };
    }return {
      authToken: false,
    };
};

const delCookies = async () => {
    await Cookies.remove("auth");
};

export { setCookies, delCookies, tokenAuthenticated,getToken };