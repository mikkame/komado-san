<template lang="pug">
  iframe(:src.prop="blob", plugins, @drop.prevent, @dragover.prevent)
</template>

<script>


    export default {
        name: 'App',
        props: [
            'tab',
        ],
        data(){
            return {
                blob:'',
            }
        },
        methods:{

        },
        mounted() {
            const reader = new FileReader();
            reader.onload = (e) => {
              this.blob = e.target.result;

            }
            reader.readAsDataURL(this.tab.file);
        }
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

