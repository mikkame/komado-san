<template lang="pug">
  #app(@drop="dropFile", @dragover.prevent, @dragenter.prevent, tabindex="0")

    Moveable.moveable(
      v-if="camera_stream && !full_screen_camera",
      v-bind="moveable",
      @drag="handleDrag",
      @scale="handleScale"
      :style="{transform:camera_transform}"
    )
      #cam-wrap
        video(:srcObject.prop="camera_stream" v-if="camera_stream", autoplay, @dblclick="toggleFulScreenCamera()")#cam
    .tab-group
      .tab-item(v-for='(tab, tab_idx) in tabs', v-bind:key='tab_idx', :class='{active:tab_idx === currentTabIndex}', @click='currentTabIndex = tab_idx')
        | {{tab.title}}
        span.icon-circle(@click="removeTab(tab)")
          span.icon.icon-cancel
      .tab-item.tab-item-fixed(@click="addTab()")
        span.icon.icon-plus
    #main_src
      div(v-show='full_screen_camera')#fullCamera-wrap
        video(:srcObject.prop="camera_stream", autoplay, @dblclick="toggleFulScreenCamera()")#fullCamera
      div(v-show='!full_screen_camera && tab_idx === currentTabIndex' v-for="(tab, tab_idx) in tabs",).tab-content
        WebTab(:tab='tab', v-if='tab.type === "WebTab"')
        BlankTab(:tab='tab', v-if='tab.type === "BlankTab"' @changeTab='changeTab')
        FileTab(:tab='tab', v-if='tab.type === "FileTab"')
        CaptureTab(:tab='tab', v-if='tab.type === "CaptureTab"')
    div.pen_field(v-if="pen", @mousemove.prevent="pen_stroke", @mousedown="pen_start",@mouseout="pen_end",@mouseup="pen_end")
      span ペンモード Ctrl+D で終了
      svg(style='width:100%;height:100%')
        path(:d="strokeToPathString(stroke)", v-for="stroke in pen_strokes", fill="transparent" stroke="red" stroke-width="5").path

    .footer-bar-wrapper
      .footer-bar
        select(v-model="camera_src", @change="changeCameraSrc")
          option(:value="null") カメラなし
          option(v-for='src in camera_sources', :value="src.deviceId") {{src.label}}
        button.btn.btn-default(@click="toggleCamera()")


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

                camera_transform: null,
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
                camera_sources:null,
                camera_src: null,
                camera_stream: null,
                pen: false,
                pen_drawing: false,
                pen_strokes: [],
                full_screen_camera: false
            }
        },
        methods: {
            strokeToPathString(stroke) {

                return stroke.points.map((point) => {
                    return 'L ' + point.x + ' ' + point.y
                }).join(' ').replace(/^L/, 'M');
            },
            pen_start(event) {
                const stroke = {
                    points: [],
                }
                this.pen_drawing = true
                this.pen_strokes.push(stroke)
                this.pen_stroke(event)

            },
            pen_end() {
                this.pen_drawing = false
            },
            pen_stroke(event) {

                if (this.pen_drawing) {
                    const stroke = this.pen_strokes[this.pen_strokes.length - 1]
                    const point = {
                        x: event.offsetX,
                        y: event.offsetY,
                    }
                    setTimeout(() => {
                        stroke.points.splice(stroke.points.indexOf(point), 1)
                    }, 1000)
                    stroke.points.push(point)
                }
            },
            toggleFulScreenCamera() {

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
            handleDrag({transform}) {
                this.camera_transform = transform;

            },
            handleScale({transform,}) {
                this.camera_transform = transform;
            },
            async changeCameraSrc() {
                if (!this.camera_src) {
                    this.camera_stream = null;
                    return;
                }
                this.camera_stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        optional: [{
                            sourceId: this.camera_src
                        }]
                    }
                })
            },
            dropFile(event) {
                event.preventDefault()
                const files = event.dataTransfer.files;
                for (var i = 0; i < files.length; i++) {
                    let file = files[i]
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const blob = e.target.result;
                        this.tabs.push({
                            title: file.name,
                            type: 'FileTab',
                            blob
                        })
                        this.currentTabIndex = this.tabs.length - 1;
                    }
                    // TODO mime type filter
                    reader.readAsDataURL(file);

                }

            },
        },
        async mounted() {

            this.camera_sources = (await navigator.mediaDevices.enumerateDevices()).filter((src) => {
                return src.kind === 'videoinput'
            })
            this.camera_src = this.camera_sources.length ? this.camera_sources[0].deviceId : null;
            this.changeCameraSrc()
            const vm = this;
            document.addEventListener('drop-file', (e) => {
                vm.tabs.push({
                  title: e.detail.name,
                  type: 'FileTab',
                  blob: e.detail.blob
              })
                console.log(vm.tabs)
            })
            document.addEventListener('toggle-draw', () => {
                vm.pen = !vm.pen
                console.log('draw')
            })

        }


    }
</script>

<style scoped>
  .path {
    pointer-events: none;
  }

  .pen_field {
    opacity: 0.8;
    mix-blend-mode: hard-light;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-shadow: inset 0px 0px 10px 0px rgba(255,0,0,1)

  }

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
    position: relative;
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
  #cam-wrap {
    width: 320px;
    height: 240px;
    background: #000;
  }
  #cam {
    width: 100%;
    height: 100%;
  }

  .moveable {
    z-index: 1;
  }

  #dragfield {
    width: 100%;
    height: 100%;

    background: rgba(255, 255, 255, 0.3);
    pointer-events: none;
  }

</style>
