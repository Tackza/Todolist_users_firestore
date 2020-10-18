<template>
  <div>
    <Header />
    <div class="container">
      <div class="row">
        <div class="input-group mb-5 mt-5">
          <input
            type="text"
            class="form-control"
            placeholder="Enter Todo please"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            v-model="title"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="insertText"
            >
              Click
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ul
            class="list-group"
            v-for="(item, index) of fetchTodo"
            :key="index"
          >
            <li class="list-group-item mb-3" :class="{ completed: item.done }">
              <div class="row">
                <div class="col-md-auto">
                  <input type="checkbox" @change="statusCheck(item)" />
                </div>
                <div class="col text-right">
                  {{ item.title }}
                </div>
                <div class="col font-weight-bolder">
                  ({{ item.time | transDate }})
                </div>
                <div class="col-md-auto">
                  <i
                    type="button"
                    class="far fa-trash-alt"
                    @click="deleteTodo(item)"
                  ></i>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import { v1 as uuid } from "uuid";
import moment from "moment";
export default {
  name: "todolist",
  components: {
    Header,
  },
  data() {
    return {
      title: "",
    };
  },
  mounted() {
    this.checkUserId();
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
      this.title = "";
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

    checkUserId() {
      if (!this.$store.state.userId) {
        this.$router.push({ name: "login" });
      }
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
#nav {
  padding: 0px 30px;
}
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
