<template lang="pug">
  #wrapper
    .tool-bar
      .buttons
        button.btn.btn-large.btn-default(v-bind:disabled="!can_go_back", @click="goBack()")
          span.icon.icon-left
        button.btn.btn-large.btn-default(v-bind:disabled="!can_go_forward", @click="goForward()")
          span.icon.icon-right
        button.btn.btn-large.btn-default(@click="reload", v-if="!loading")
          span.icon.icon-cw
        button.btn.btn-large.btn-default(@click="loadStop", v-if="loading")
          span.icon.icon-cancel
      form(@submit="loadURL", style="width:100%")
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
                loading:false,
                current_address: '',
                can_go_back: false,
                can_go_forward:false,
            }
        },
        mounted() {
            const webview = this.$el.querySelector('webview');
            webview.addEventListener('did-stop-loading', this.update);
            webview.addEventListener('load-commit', this.loadStart);
            webview.addEventListener('page-title-updated', this.updateTitle);
        },
        methods: {
            updateTitle(){
                const webview = this.$el.querySelector('webview');
                this.tab.title = webview.getTitle()

            },
            loadStart(){
                const webview = this.$el.querySelector('webview');
                this.loading = true
                this.current_address = webview.getURL()
            },
            update(){
                const webview = this.$el.querySelector('webview');
                this.can_go_back = webview.canGoBack()
                this.can_go_forward = webview.canGoForward()
                this.loading = false
            },
            reload() {
                this.$el.querySelector('webview').reload()
            },
            loadStop() {
                this.$el.querySelector('webview').stop()
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

