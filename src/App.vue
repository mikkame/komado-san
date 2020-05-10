<template lang="pug">

  #app
    #overlay
      Moveable.moveable(
        v-if="camera_src",
        v-bind="moveable",
        @drag="handleDrag",
        @resize="handleResize",
        @scale="handleScale"

      )
        video(:srcObject.prop="camera_src" v-if="camera_src", autoplay)#cam
    .tab-group
      .tab-item(v-for='(tab, tab_idx) in tabs', v-bind:key='tab_idx', :class='{active:tab_idx === currentTabIndex}', @click='currentTabIndex = tab_idx')

        | {{tab.title}}
        span.icon-circle(@click="removeTab(tab)")
          span.icon.icon-cancel
      .tab-item.tab-item-fixed(@click="addTab()")
        span.icon.icon-plus
    #main_src
      component(:tab='tabs[currentTabIndex]', v-bind:is='tabs[currentTabIndex].type', @changeTab='changeTab')
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
    import Moveable from 'vue-moveable'

    export default {
        name: 'App',
        components: {
            BlankTab,
            WebTab,
            Moveable
        },
        data: () => {
            return {
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

                camera_src: null
            }
        },
        methods: {
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
            handleDrag({ target, transform }) {
                console.log('onDrag left, top', transform);
                target.style.transform = transform;
            },
            handleResize({
                             target, width, height, delta,
                         }) {
                console.log('onResize', width, height);
                delta[0] && (target.style.width = `${width}px`);
                delta[1] && (target.style.height = `${height}px`);
            },
            handleScale({ target, transform, scale }) {
                console.log('onScale scale', scale);
                target.style.transform = transform;
            },
            handleRotate({ target, dist, transform }) {
                console.log('onRotate', dist);
                target.style.transform = transform;
            },
            handleWarp({ target, transform }) {
                console.log('onWarp', transform);
                target.style.transform = transform;
            },
            handlePinch({ target }) {
                console.log('onPinch', target);
            },

        }
    }
</script>

<style>
  html, body, #app {
    padding: 0;
    margin: 0;
    height: 100%;
    position: relative;
  }

  .btn {
    cursor: pointer;
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


</style>
