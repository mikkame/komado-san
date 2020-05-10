<template lang="pug">
  #selector
    div
      form(@submit='addWebTab(search_word)')
        .form-group
          input(v-model='search_word', placeholder='Googleで検索').form-control
      p ファイルを表示したい時はアプリにドロップ（PDFをサポート）
      button.btn.btn-default.btn-large(@click="addCaptureTab") 他のアプリの画面を映したい時はここをクリック
</template>

<script>


    export default {
        name: 'App',
        props: [
            'tabs',
            'tab',
            'currentTabIndex'
        ],
        components: {},
        data: () => {
            return {
                search_word: ""
            }
        },
        methods: {
            addWebTab(search_word) {
                this.$emit('changeTab', this.tab, {
                    title: 'WebTab',
                    type: 'WebTab',
                    url: "https://www.google.com/search?&q=" + search_word
                })
            },
            async addCaptureTab() {
              this.$emit('changeTab', this.tab, {
                  title: '画面共有',
                  type: 'CaptureTab',
              })

            }
        }
    }
</script>
<style scoped>
  #selector {
    width: 80%;
    margin: 10% auto 0 auto;
  }
</style>

