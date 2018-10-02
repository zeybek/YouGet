<template>
<div>
  <div class="title-bar">
    <div id="header-left">
      <i style="margin-left:5px;" class="fas fa-bars"></i>
    </div>
    <div style="cursor: default" id="header-text">
      YouGet
    </div>
    <div id="header-right">
      <i style="margin-right:5px;" class="fas fa-times-circle" @click="quitApp"></i>
    </div>
  </div>
  <br>
  <div id="app">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
const { ipcRenderer } = require('electron');

  export default {
    name: 'youget',
    methods: {
      quitApp: function(){
        console.log("Test")
        ipcRenderer.send('quit-app');
      }
    }
  }
</script>

<style scoped>
.title-bar {
  display: flex;
  width: 100%;
  background-color: #444;
  color: white;
  position: fixed;
  padding: 7px 5px;
  font-weight: bold;
  font-size: 10pt;
  justify-content: center;
  align-items: center;
  border-radius: 10px 10px 0 0;
  box-shadow: 0px 16px 20px rgba(0,0,0,0.05);
}

.title-bar > #header-left,.title-bar > #header-right {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
}

#header-left {
  display: flex;
  justify-content: flex-start !important;
  color: white;
}

#header-text {
  -webkit-app-region: drag;
  /* background: white; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  -webkit-user-select: none;
  /* border: 1px solid white; */
  /* bottom: 10px !important; */
}
  /* CSS */
@import './assets/style.css';
</style>
