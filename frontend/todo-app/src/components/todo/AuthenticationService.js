import axios from "axios";
import {API_URL, USER_NAME_SESSION_ATTRIBUTE_NAME} from "../../Constants";

class AuthenticationService {

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`, {username,password});
    }

    createJwtToken(token) {
        return 'Bearer ' +  token
    }

    registerSuccessfulLogin(username,token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createJwtToken(token))
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        return sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME) !== null;

    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        return user === null ? '' : user;
    }

    setupAxiosInterceptors(jwtHeader) {
        axios.interceptors.request.use(
            config => {
                if(this.isUserLoggedIn()) {
                    config.headers.authorization = jwtHeader
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()