<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <input
          class="form-control"
          type="text"
          placeholder="Input Title"
          v-model="title"
        />
      </div>
      <div class="col-1">
        <button class="btn btn-success form-control-sm" @click="insertText">
          click
        </button>
        <button class="btn btn-danger" @click="logout">logout</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <ul class="list-group" v-for="(item, index) of fetchTodo" :key="index">
          <li class="list-group-item" :class="{ 'completed': item.done }">
            {{ item.title }} ({{ item.time | transDate }})
            <input type="checkbox" @change="statusCheck(item)" />
            <div class="col">
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="deleteTodo(item)"
              >
                del
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { v1 as uuid } from "uuid";
import moment from "moment";
export default {
  name: "todolist",
  data() {
    return {
      title: "",
    };
  },
  mounted() {
    this.fetchData();
  },

  computed: {
    fetchTodo() {
      return this.$store.getters["fetchTodo"];
    },
  },
  methods: {
    insertText() {
      const data = {
        title: this.title,
        id: uuid(),
      };
      this.$store.dispatch("insertTodo", data);
    },
    fetchData() {
      this.$store.dispatch("fetchData");
    },
    deleteTodo(item) {
      this.$store.dispatch("deleteTodo", item.id);
    },
    statusCheck(item) {
      this.$store.dispatch("changeStatus", item);
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "login" });
    },
  },
  filters: {
    transDate(val) {
      return moment(val).fromNow();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.completed {
  text-decoration: line-through;
}
</style>
