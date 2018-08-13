<template>
  <div class="hello">
    <input type="phone" class="input-box" v-model="value">
    <button @click="sendRequest" class="submit-btn">click me</button>
    <button @click="sendRequest1" class="submit-btn">click me</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    sendRequest () {
        this.$post('/api/saveInfo', {
          value: this.value,
          requestName: 'name01'
        }, '请求失败啦~~~').then(res => {
          // alert(res.data)
        })
    },
    sendRequest1 () {
        this.$get('/api/saveInfo', {
          value: this.value,
          requestName: 'name02'
        }, '请求失败啦~~~').then(res => {
          // alert(res.data)
        })
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
.input-box {
  border: 1px solid #ccc;
}
.submit-btn {
  background: #f00;
  color: #fff;
}
</style>
