<template lang="pug">
  #wrapper
    .tool-bar
      .buttons
        button.btn.btn-large.btn-default(v-bind:disabled="!can_go_back", @click="goBack()")
          span.icon.icon-left
        button.btn.btn-large.btn-default(v-bind:disabled="!can_go_forward", @click="goForward()")
          span.icon.icon-right
        button.btn.btn-large.btn-default
          span.icon.icon-cw
      form(@submit="loadURL")
        input.form-control(v-model="current_address")
    webview(:src='tab.url', )

</template>

<script>


    export default {
        name: 'App',
        props: [
            'tab'
        ],
        components: {},
        data: () => {
            return {
                current_address: '',
                can_go_back: false,
                can_go_forward:false,
            }
        },
        mounted() {

            this.$el.querySelector('webview').addEventListener('did-finish-load', this.update);
        },
        methods: {
            update(){
                const webview = this.$el.querySelector('webview');
                this.tab.title = webview.getTitle()
                this.current_address = webview.getURL()
                this.can_go_back = webview.canGoBack()
                this.can_go_forward = webview.canGoForward()
            },
            reload() {
                this.$el.querySelector('webview').reload()
            },
            goBack() {
                this.$el.querySelector('webview').goBack()
            },
            goForward() {
                this.$el.querySelector('webview').goForward()
            },
            loadURL(event) {
                event.preventDefault()
                this.$el.querySelector('webview').loadURL(this.current_address)
            }
        }
    }
</script>
<style>
  .btn[disabled] {
    pointer-events: none;
    cursor: not-allowed;
    background: #aaa;
  }
  webview {
    width: 100%;
    height: 100%;
  }

  #wrapper {
    height: 100%;
  }

  .buttons {
    width: 150px;
  }

  .buttons .btn {
    height: 33px !important;
  }

  .tool-bar {
    display: flex;
    width: 100%;
    height: 42px;
    padding: 4px;
    background: #eee;
  }
</style>

