<template lang="pug">
  #app(@drop="dropFile", @dragover.prevent, @dragenter.prevent, :class="{draging:draging}")
    #overlay
      Moveable.moveable(
        v-if="camera_src && !full_screen_camera",
        v-bind="moveable",
        @drag="handleDrag",
        @scale="handleScale"
        :style="{transform:camera_transform}"
      )
        video(:srcObject.prop="camera_src" v-if="camera_src", autoplay, @dblclick="toggleFulScreenCamera()")#cam
    .tab-group
      .tab-item(v-for='(tab, tab_idx) in tabs', v-bind:key='tab_idx', :class='{active:tab_idx === currentTabIndex}', @click='currentTabIndex = tab_idx')
        | {{tab.title}}
        span.icon-circle(@click="removeTab(tab)")
          span.icon.icon-cancel
      .tab-item.tab-item-fixed(@click="addTab()")
        span.icon.icon-plus
    #main_src
      div(v-show='full_screen_camera')#fullCamera-wrap
        video(:srcObject.prop="camera_src", autoplay, @dblclick="toggleFulScreenCamera()")#fullCamera
      div(v-show='!full_screen_camera && tab_idx === currentTabIndex' v-for="(tab, tab_idx) in tabs",).tab-content
        WebTab(:tab='tab', v-if='tab.type === "WebTab"')
        BlankTab(:tab='tab', v-if='tab.type === "BlankTab"' @changeTab='changeTab')
        FileTab(:tab='tab', v-if='tab.type === "FileTab"')
        CaptureTab(:tab='tab', v-if='tab.type === "CaptureTab"')

    .footer-bar-wrapper
      .footer-bar
        button.btn.btn-default(@click="toggleCamera()")
          span.icon.icon-camera
          | カメラ
          | {{camera_src ? "Off" : "On"}}

</template>

<script>

    import BlankTab from './components/BlankTab'
    import WebTab from './components/WebTab'
    import FileTab from './components/FileTab'
    import CaptureTab from "./components/CaptureTab";

    import Moveable from 'vue-moveable'

    export default {
        name: 'App',
        components: {
            BlankTab,
            WebTab,
            Moveable,
            FileTab,
            CaptureTab
        },
        data: () => {
            return {

                camera_transform:null,
                moveable: {
                    draggable: true,
                    throttleDrag: 0,
                    resizable: false,
                    throttleResize: 1,
                    keepRatio: true,
                    scalable: true,
                    throttleScale: 0,

                },
                tabs: [
                    {
                        title: '新しいタブ',
                        type: 'BlankTab',
                    },
                ],
                currentTabIndex: 0,
                camera_src: null,
                full_screen_camera:false
            }
        },
        methods: {
            toggleFulScreenCamera(){

              this.full_screen_camera = !this.full_screen_camera;

            },
            addTab() {
                this.tabs.push({
                    title: '新しいタブ',
                    type: 'BlankTab'
                });
                this.currentTabIndex = this.tabs.length - 1;

            },
            changeTab(oldTab, newTab) {
                this.tabs.splice(
                    this.tabs.indexOf(oldTab),
                    1,
                    newTab
                );
            },
            removeTab(tab) {
                this.tabs.splice(
                    this.tabs.indexOf(tab),
                    1
                );
                this.currentTabIndex--;
                if (this.tabs.length === 0) {
                    this.tabs.push({
                        title: '新しいタブ',
                        type: 'BlankTab'
                    });
                    this.currentTabIndex = this.tabs.length - 1;
                }
            },
            async toggleCamera() {
                if (this.camera_src) {
                    this.camera_src = null;
                } else {
                    this.camera_src = await navigator.mediaDevices.getUserMedia({video: true})
                }
            },
            handleDrag({ transform }) {
                this.camera_transform = transform;

            },
            handleScale({ transform, }) {
                this.camera_transform = transform;
            },
            dropFile(event) {

                event.preventDefault()
                const files =  event.dataTransfer.files;
                for (var i = 0; i < files.length; i++) {
                    let file = files[i]
                    this.tabs.push({
                        title : file.name,
                        type: 'FileTab',
                        file
                    })
                    this.currentTabIndex = this.tabs.length -1;
                }

            },

        }
    }
</script>

<style scoped>
  html, body, #app {
    padding: 0;
    margin: 0;
    height: 100%;
    position: relative;
  }
  #fullCamera-wrap {
    width: 100%;
    height: 100%;
    background: black;
    z-index: 10000;
  }
  #fullCamera {
    width: 100%;
    height: 100%;
  }
  .btn {
    cursor: pointer;
  }
  .tab-content {
    height: 100%;
    width: 100%;
  }
  span.icon-circle {
    height: 16px;
    width: 16px;
    border-radius: 50%;

    margin: 2px;
    line-height: 14px;
    padding: 1px;
    display: inline-block;
    cursor: pointer;

  }

  .tab-item:hover .icon-circle {
    background: #aaa;
  }

  .tab-item:after {
    pointer-events: none;

  }

  #main_src {
    height: calc(100% - 40px);
  }

  #camera {
    width: 100px;
    height: 100px;

    background: black;
  }

  .moveable {
    position: absolute;
  }

  .footer-bar-wrapper {
    height: 32px;
    width: 100%;
    position: absolute;
    bottom: 0;
  }

  .footer-bar {
    display: flex;
    background: rgba(0, 0, 0, 0.3);
    height: 100%;
    width: 100%;
    transition: .3s;
    opacity: 0;
    height: 32px;
    padding: 4px;

  }

  .footer-bar-wrapper:hover .footer-bar {
    opacity: 1;
  }
  #cam {
    width: 320px;
    height: 240px;
  }
  #overlay {

    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
  }
  #dragfield {
    width: 100%;
    height: 100%;

    background: rgba(255, 255, 255, 0.3);
    pointer-events: none;
  }

</style>
