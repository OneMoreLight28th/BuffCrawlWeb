import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex);



//这里有个坑mmp的注意vue和vuex的版本兼容！！！
export default new Vuex.Store({
    state:{
        routes:[],
        loggedIn: false,

    },
    mutations:{
        initRoutes(state,data){
            state.routes = data;
        },
        setLoggedIn(state, value) {
            state.loggedIn = value;
        },

    },
    actions:{}
})
