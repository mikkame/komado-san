<template>
  <div id="app">
    <div id="tabs">
      <div class="tab" v-for="tab in tabs">
        {{tab.title}}
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data: () => {
    return {
      tabs:[
        {
          title: "Blank tab",
          type: "blank",


        }
      ]
    }
  }
}
</script>

<style>
  #tabs{
    height: 40px;
    width:100%;
    overflow-x: scroll;
  }
</style>
