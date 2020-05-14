<template lang="pug">
  iframe(:src.prop="tab.blob", plugins,)
</template>

<script>


    export default {
        props: [
            'tab',
        ]
    }
</script>
<style>
  #selector{
    width: 80%;
    margin:10% auto 0 auto;
  }
  iframe{
    width: 98%;
    height: 98%;
    margin: 1%;
  }
  .draging iframe {
    display: none;
  }
</style>

