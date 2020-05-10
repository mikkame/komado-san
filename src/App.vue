<template lang="pug">

  #app
    .tab-group
      .tab-item(v-for='(tab, tab_idx) in tabs', v-bind:key='tab_idx', :class='{active:tab_idx === currentTabIndex}', @click='currentTabIndex = tab_idx')
        | {{tab.title}}
      .tab-item.tab-item-fixed(@click="addTab()")
        span.icon.icon-plus
    #main_src
      component(:tab='tabs[currentTabIndex]', v-bind:is='tabs[currentTabIndex].type', @changeTab='changeTab')
    moveable.moveable(v-bind='moveable', @drag='handleDrag')
      video#camera(:src='camera_src')


  </div>
</template>

<script>

import BlankTab from './components/BlankTab'
import WebTab from './components/WebTab'
import Moveable from 'vue-moveable';
export default {
  name: 'App',
  components: {
    BlankTab,
    WebTab,
    Moveable
  },
  data: () => {
    return {
      tabs:[
        {
          title: '新しいタブ',
          type: 'BlankTab',
        },
      ],
      currentTabIndex:0,
      moveable: {
        draggable: true,
        throttleDrag: 0,

      },
      camera_src:null
    }
  },
  methods: {
    addTab(){
        this.tabs.push({
           title:'新しいタブ',
           type: 'BlankTab'
        });
        this.currentTabIndex = this.tabs.length-1;
    },
    changeTab(oldTab,newTab) {

      this.tabs.splice(
          this.tabs.indexOf(oldTab),
          1,
          newTab
      );


    },
    handleDrag({ target, left, top }) {
      console.log('onDrag left, top', left, top);
      target.style.left = `${left}px`;
      target.style.top = `${top}px`;
    },

  },
  mounted () {
    const onFailSoHard = function(e) {
      console.log('Reeeejected!', e);
    };


    navigator.getUserMedia({video:true}, function(stream) {

      let video = document.querySelector('video');
      // Older browsers may not have srcObject
      if ("srcObject" in video) {
        video.srcObject = stream;
      } else {
        // Avoid using this in new browsers, as it is going away.
        video.src = window.URL.createObjectURL(stream);
      }
      video.onloadedmetadata = function() {
        video.play();
      };

    }, onFailSoHard);
  }
}
</script>

<style>
  html,body,#app{
    padding: 0;
    margin: 0;
    height: 100%;
    position: relative;
  }


  #main_src {
    height: calc(100% - 40px);
  }
  #camera {
    width:100px;
    height: 100px;

    background: black;
  }
  .moveable {
    position: absolute;
  }


</style>
