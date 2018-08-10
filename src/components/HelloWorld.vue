<template>
  <div class="hello">
    hello
    <button @click="sendRequest">click me</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  methods: {
    sendRequest () {
      setTimeout(() => {
        this.$axios.post('/api/saveInfo', {
          data: 'hello',
          title: 'zy'
        }).then(res => {
        }).catch(error => {
        })
      }, 200)
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
</style>
