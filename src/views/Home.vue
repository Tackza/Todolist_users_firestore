<template>
  <div class="home">
    <Todolist />
  </div>
</template>

<script>
// @ is an alias to /src
import Todolist from '@/components/Todolist.vue'

export default {
  name: 'Home',
  components: {
    Todolist
  }
}
</script>
