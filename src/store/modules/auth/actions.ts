import axios from "axios";
import router from "@/router";

export default {
    async signup(context: any, payload: any) {
        const url = "/api/auth/register";

        return axios.post(url, {
            email: payload.email,
            password: payload.password
        }); 
    },
    async login(context: any, payload: any) {
        const url = "/api/auth/login";
    
        return axios.post(url, {
            email: payload.email,
            password: payload.password
        });
    },
    logout(context: any, payload: any) {
        //this method will be called either clicking logout
        console.log('logged out');
        
        //Delete the connection from the database 
        payload.connection.invoke('DeleteConnection', payload.connection.connectionId)
            .then(() => {
                //kill ws connection
                payload.connection.stop()
                    .then(() => {
                        
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error));

        //remove JWT token from local storage
        localStorage.removeItem("token"); localStorage.removeItem("userId");

        //clear store auth data
        context.commit('setUser', {
            token: null,
            userId: null,
            email: null,
            isAuthenticated: false
        });
        
        //navigate to back to /home
        router.replace("/home");
        
    },
    autoLogin(context) {
        //completing later
    }
}