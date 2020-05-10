<template>
    <div id="selector">
        <ul>
            <li>
                <a href="#" @click="addWebTab()">ウェブサイトをタブに追加</a>

            </li>
            <li>
                <a href="#" @click="addPDFTab()">PDFをタブに追加</a>

            </li>
            <li>
                <a href="#" @click="addCaptureTab()">ウェブサイトをタブに追加</a>
            </li>
        </ul>
    </div>
</template>

<script>


  export default {
    name: 'App',
    props: [
      'tabs',
      'currentTabIndex'
    ],
    components: {

    },
    data: () => {
      return {
        tabs:[
          {
            title: "Blank tab",
            type: "BlankTab",


          }
        ]
      }
    },
    methods:{
      addWebTab(){

        this.$emit('addTab',{
          title: 'WebTab',
          type: 'WebTab'
        })

      }
    }
  }
</script>
<style>

</style>

