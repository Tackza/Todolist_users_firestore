import Vue from "vue";
import Vuex from "vuex";
import firebaseInstance from "../../firebaseInstance";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: null,
    todos: [],
  },
  mutations: {
    LOGIN(state, pinId) {
      state.userId = pinId;
    },
    LOGOUT(state) {
      state.userId = null;
    },
    INSERT_TODO(state, itemTodo) {
      state.todos.push(itemTodo);
    },
    DELETE_TODO(state, id) {
      const todoTarget = state.todos.filter((todo) => todo.id !== id);
      console.log(todoTarget);
      state.todos = todoTarget;
    },
    FETCH_DATA(state, resultData) {
      state.todos = resultData;
      console.log(state.todos);
    },
    CHANGE_STATUS(state, item) {
      state.todos = state.todos.map((todo) => {
        if (todo.id === item.id) {
          todo.done = !todo.done;
        }
      });
    },
  },
  actions: {
    async init({ dispatch }, phoneNumber) {
      await dispatch("login", phoneNumber);
      await dispatch("fetchData");
    },

    async login({ commit }, phoneNumber) {
      console.log(phoneNumber);
      const response = await firebaseInstance.firestore
        .collection("Users")
        .where("pinId", "==", phoneNumber.toString())
        .get();
      const userPinId = response.docs.map((doc) => {
        return doc.data();
      });
      console.log(response);
      commit("LOGIN", userPinId[0].pinId);
    },

    logout({ commit }) {
      commit("LOGOUT");
    },

    async fetchData({ commit }) {
      console.log(this.state.userId);
      let result = await firebaseInstance.firestore
        .collection("Todos")
        .where("userId", "==", this.state.userId)
        .get();
      let resultData = result.docs.map((doc) => {
        return doc.data();
      });
      console.log(resultData[0]);
      commit("FETCH_DATA", resultData);
    },

    async insertTodo({ commit }, data) {
      const itemTodo = {
        title: data.title,
        id: data.id,
        done: false,
        userId: this.state.userId,
        time: Date(0),
      };
      console.log(itemTodo);
      await firebaseInstance.firestore
        .collection("Todos")
        .doc(itemTodo.id)
        .set(itemTodo);

      commit("INSERT_TODO", itemTodo);
    },

    async deleteTodo({ commit }, id) {
      await firebaseInstance.firestore
        .collection("Todos")
        .doc(id.toString())
        .delete();
      commit("DELETE_TODO", id);
    },

    async changeStatus({ commit, dispatch }, item) {
      console.log(item.id);
      await firebaseInstance.firestore
        .collection("Todos")
        .doc(item.id.toString())
        .update({ done: !item.done });

      commit("CHANGE_STATUS", item);
      dispatch("fetchData");
    },
  },
  getters: {
    fetchTodo(state) {
      return state.todos;
    },
  },
});
