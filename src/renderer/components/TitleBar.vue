<template>
<div class="titlebar">

  <div class="titlebar-controls">
      <div class="titlebar-close" v-on:click="closeApp">
          <svg x="0px" y="0px" viewBox="0 0 10 10" v-on:click="closeApp">
              <polygon fill="#fff" points="10,1 9,0 5,4 1,0 0,1 4,5 0,9 1,10 5,6 9,10 10,9 6,5"></polygon>
          </svg>
      </div>
  </div>
</div>
</template>

<script>
  import { app, BrowserWindow } from 'electron'
  
  export default {
    name: 'title-bar',
    data () {
      return {
      }
    },
    methods: {
      closeApp: function(){
        app.getCurrentWindow().close();
      }
    }
  }
</script>

<style scoped>
  .titlebar
  {
      display: block;
      position: relative;
      height: 32px;
      padding: 0;
      background-color: rgb(255, 0, 0);
      color: white
  }

  .titlebar.draggable
  {
      -webkit-app-region: drag;
  }

  .titlebar-controls
  {
      float: right;
      text-align: left;
  }

  .titlebar:after,
  .titlebar-controls:after
  {
      content: ' ';
      display: table;
      clear: both;
  }

  .titlebar-minimize,
  .titlebar-resize,
  .titlebar-close
  {
      float: left;
      width: 45px;
      height: 31px;
      margin: 1px 1px 0 0;
      text-align: center;
      line-height: 29px;

      -webkit-transition: background-color .2s;
      -moz-transition: background-color .2s;
      -ms-transition: background-color .2s;
      -o-transition: background-color .2s;
      transition: background-color .2s;
  }

  .titlebar.draggable .titlebar-minimize,
  .titlebar.draggable .titlebar-resize,
  .titlebar.draggable .titlebar-close
  {
      -webkit-app-region: no-drag;
  }

  .titlebar-minimize svg,
  .titlebar-resize svg.maximize-svg,
  .titlebar-resize svg.fullscreen-svg,
  .titlebar-close svg
  {
      width: 10px;
      height: 10px;
      shape-rendering: crispEdges;
  }

  .titlebar-close svg polygon
  {
      -webkit-transition: fill .2s;
      -moz-transition: fill .2s;
      -ms-transition: fill .2s;
      -o-transition: fill .2s;
      transition: fill .2s;
  }

  .titlebar:not(.fullscreen) svg.maximize-svg
  {
      display: none;
  }

  .titlebar.fullscreen svg.fullscreen-svg
  {
      display: none;
  }

  .titlebar-minimize:hover,
  .titlebar-resize:hover,
  .titlebar-fullscreen:hover
  {
      background-color: rgba(255, 255, 255, 0.1);
  }

  .titlebar-light .titlebar-minimize:hover,
  .titlebar-light .titlebar-resize:hover,
  .titlebar-light .titlebar-fullscreen:hover
  {
      background-color: rgba(0, 0, 0, 0.1);
  }

  .titlebar-close:hover
  {
      background-color: rgba(232, 17, 35, 0.9);
  }

  .titlebar-close:hover svg polygon
  {
      fill: rgba(255, 255, 255, 1);
  }

  .titlebar-light .titlebar-close:hover
  {
      fill: rgba(0, 0, 0, 1);
  }

  .titlebar-light svg polygon,
  .titlebar-light svg rect,
  .titlebar-light svg > path
  {
      fill: rgba(255, 255, 255, 1);
  }

  .titlebar-light .titlebar-close:hover
  {
      background-color: rgba(232, 17, 35, 0.9);
  }

</style>

