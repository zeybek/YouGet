<template>
<div>
    <b-input :disabled="isDownloading" v-model="videoUrl" placeholder="Enter Your Video / Playlist URL or ID"></b-input><br>
    <div class="timeRange">
      <b-tooltip label="Output Formats Currently Disabled" position="is-right" type="is-dark" animated>
        <b-select disabled v-if="isAudio == 'Video'" placeholder="Format" style="margin-right: 20px" icon="file-video" icon-pack="fas" v-model="videoFormat">
            <option value="mp4">MP4</option>
            <option value="flv">FLV</option>
            <option value="avi">AVI</option>
            <option value="mov">MOV</option>
            <option value="3gp">3GP</option>
            <option value="gif">GIF</option>
        </b-select>
        <b-select disabled v-else placeholder="Format" style="margin-right: 20px" icon="file-video" icon-pack="fas" v-model="audioFormat">
            <option value="mp3">MP3</option>
            <option value="ogg">OGG</option>
            <option value="m4a">M4A</option>
            <option value="aac">AAC</option>
        </b-select>
      </b-tooltip>
      <b-tooltip :label="isAudio == 'Audio' ? 'Select Audio Quality' : 'Video Quality Currently Disabled'" position="is-right" type="is-dark" animated>
        <b-select disabled v-if="isAudio == 'Video'" placeholder="Quality" style="margin-right: 20px" required  icon="certificate" icon-pack="fas" v-model="videoQuality">
            <option value="1920x1080">Highest</option>
            <option value="1280x720">720p</option>
            <option value="848x480">480p</option>
            <option value="426×240">240p</option>
            <option value="256×144">144p</option>
        </b-select>
        <b-select v-if="isAudio == 'Audio'" placeholder="Quality" style="margin-right: 20px" required  icon="certificate" icon-pack="fas" v-model="audioQuality">
            <option value="320">320kbps</option>
            <option value="240">240kbps</option>
            <option value="196">196kbps</option>
            <option value="128">128kbps</option>
            <option value="96">96kbps</option>
        </b-select>
      </b-tooltip>
      <b-switch v-model="isAudio"
          true-value="Audio"
          false-value="Video">
          {{ isAudio }}
      </b-switch>
      <b-switch :disabled="isAudio == 'Audio' ? true : false" v-model="isSubtitle">
          Subtitle
      </b-switch>
    </div><br>
    <div style="display: flex;">
      <b-tooltip label="Video Start Time" position="is-right" type="is-dark" animated>
        <input :disabled="isAudio == 'Audio' ? true : false || isDownloading" class="input inputTime" type="text" placeholder="hh:mm:ss" v-model="startTime" style="margin-right: 20px; width: 100%;">
      </b-tooltip>
      <b-tooltip label="Video End Time" position="is-right" type="is-dark" animated>
        <input :disabled="isAudio == 'Audio'? true : false || isDownloading" class="input inputTime" type="text" placeholder="hh:mm:ss" v-model="endTime" style=" width: 100%;">
      </b-tooltip>
      <b-tooltip label="Current Output Folder" position="is-left" type="is-dark" animated>
        <b-input icon-pack="fas" icon="folder" v-model="currentSaveFolder" placeholder="Save Folder" style="margin-left: 20px; width: 200px"></b-input>
      </b-tooltip>
      <a class="button is-warning" style="width: 25%;margin-left: 20px;" @click="openSaveFolder">Browse</a><br>
    </div>
    <br>
    <div>
      <vmProgress style="cursor: default" text-inside :percentage="currentProgress" type="line" stroke-width="17" status="exception" stroke-linecap="round" track-color="rgba(255,0,0,0.1)" striped></vmProgress>
      <br>
      <a v-bind:class="{ 'is-loading': isDownloading }" class="button is-primary" style="width: 100%;" @click="downloadFile">Download</a><br><br>
      <div style="display: flex; justify-content: center">
        <strong style="cursor: default">{{videoTitle}}</strong>
      </div><br>
      <div class="statistics">
        <div id="footer-left">
          <strong style="cursor: default; color: green; opacity: 0.5"></strong>
        </div>
        <div style="cursor: default" id="footer-text">
          ©2018 &middot; Ahmet Zeybek &middot;&nbsp;
          <i style="cursor: pointer" id="open-github" @click="open('https://github.com/ahmetzeybek')" class="fab fa-github"></i>&nbsp;
          <i style="cursor: pointer" id="open-twitter" @click="open('https://twitter.com/a_zybk')" class="fab fa-twitter"></i>
        </div>
        <div id="footer-right">
        </div>
      </div>
    </div>
    <!-- <hr style="color: black !important; background-color: red !important;"> -->
    <!-- Extra Tools -->
  <!-- <div v-if="paidLicense" class="extra-tools">
      <div class="field">
      <div class="file is-boxed is-warning has-name">
        <label class="file-label" style="width: 100%">
          <input class="file-input" @click="openFile" name="resume">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              {{fileName}}
            </span>
          </span>
        </label>
      </div>
    </div>
    <div class="extra-tools-buttons" style="display: flex;">
      <a v-bind:class="{ 'is-loading': isDownloading }" class="button is-primary" style="width: 100%; margin-right: 20px;" @click="testFullHD">1080p</a>
      <a v-bind:class="{ 'is-loading': isDownloading }" class="button is-primary" style="width: 100%; margin-right: 20px;" @click="convertGIF">Convert To GIF</a>
      <a v-bind:class="{ 'is-loading': isDownloading }" class="button is-primary" style="width: 100%; margin-right: 20px;" @click="convertMP3">Convert to MP3</a>
      <a v-bind:class="{ 'is-loading': isDownloading }" class="button is-primary" style="width: 100%;" @click="cutVideo">Cut Video</a>
    </div><br>
      <router-link :to="{ name: 'settings' }"><a class="button is-info" style="width: 100%;" @click="cutVideo">Settings</a></router-link><br>
  </div>
  <div v-if="!paidLicense" class="extra-tools">
      <div class="field">
      <div class="file is-boxed is-warning has-name">
        <label class="file-label" style="width: 100%">
          <input disabled class="file-input" @click="openFile" name="resume" id="file">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              {{fileName}}
            </span>
          </span>
        </label>
      </div>
    </div>
    <div class="extra-tools-buttons" style="display: flex;">
      <a disabled v-bind:class="{ 'is-loading': isDownloading }" class="button is-primary" style="width: 100%; margin-right: 20px;" @click="downloadFile">Convert To GIF</a>
      <a disabled v-bind:class="{ 'is-loading': isDownloading }" class="button is-primary" style="width: 100%; margin-right: 20px;" @click="downloadFile">Convert to MP3</a>
      <a disabled v-bind:class="{ 'is-loading': isDownloading }" class="button is-primary" style="width: 100%;" @click="downloadFile">Cut Video</a>
    </div>
  </div> -->

  <!-- <img class="video-thumbnail" :src="videoThumbnail" alt=""> -->
</div>
</template>

<script>
//------------------------------------------//
const fs = require('fs');
const path = require('path');
const https = require('https');
const os = require('os');
const electron = require('electron');
const resolve = require('path').resolve

//------------------------------------------//
import axios from 'axios';
const moment = require('moment');
const clipboardy = require('clipboardy');
const notifier = require('node-notifier');

//------------------------------------------//
const menuremote = electron.remote;
const Menu = menuremote.Menu;
const { ipcRenderer } = require('electron');

//------------------------------------------//
const ytdl = require('ytdl-core');
const youtubedl = require('youtube-dl'); // For Captions
const ypi = require('youtube-playlist-info');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path.replace(
  'app.asar',
  'app.asar.unpacked'
);
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const remote = require('electron');
// import TitleBar from './TitleBar';
// import debounce from 'lodash/debounce';
const InputMenu = Menu.buildFromTemplate([
  {
    label: 'Cut',
    role: 'cut'
  },
  {
    label: 'Copy',
    role: 'copy'
  },
  {
    label: 'Paste',
    role: 'paste'
  }
]);
const directorySeparator = os.type().includes('Windows') ? '\\' : '/'

document.body.addEventListener('contextmenu', e => {
  e.preventDefault();
  e.stopPropagation();

  let node = e.target;

  while (node) {
    if (node.nodeName.match(/^(input|textarea)$/i) || node.isContentEditable) {
      InputMenu.popup(menuremote.getCurrentWindow());
      break;
    }
    node = node.parentNode;
  }
});

export default {
  data() {
    return {
      videoUrl: '',
      currentProgress: 0,
      quality: 'default',
      videoID: '',
      videoTitle: 'No Download Queue Currently',
      videoThumbnail: '',
      totalSize: '',
      totalLength: '',
      isSwitchedCustom: 'Video',
      remainingTime: 0,
      isDownloading: false,
      data: [],
      name: '',
      selected: null,
      isFetching: false,
      startTime: '',
      endTime: '',
      isAudio: 'Video',
      currentSaveFolder: os.homedir() + directorySeparator + 'Desktop'+ directorySeparator +'YouGet_Downloads' + directorySeparator,
      isSubtitle: '',
      totalRangeSecond: '',
      requestCutVideo: false,
      videoFormat: 'mp4',
      audioFormat: 'mp3',
      videoQuality: '1920x1080',
      audioQuality: 128,
      subtitleURL: '',
      playlistVideoSize: null,
      totalPlaylistSize: null,
      fileName: 'Select Your File',
      paidLicense: true,
      ytAPI: 'ENTER YOUR YOUTUBE API KEY HERE',
      playlistVideos: [],
      currentVideo: 0
    };
  },
  name: 'home',
  components: {},
  methods: {
    quitApp: function(){
      console.log("Test")
      ipcRenderer.send('quit-app');
    },
    runToaster: function(){
      console.log(__dirname.replace('app.asar\\dist\\electron','app.asar.unpacked') + '\\icon.png');
      notifier.notify(
        {
          title: 'YouGet',
          message: this.videoTitle + '\n\nDownload Finished',
          icon: path.join(__dirname.replace('app.asar\\dist\\electron','app.asar.unpacked') + '\\icon.png'),
          // icon: resolve('./icon.png'),
          sound: true,
          wait: true
        },
        function(error, response) {
          // console.log(response);
        }
      );
    },
    open(link) {
      this.$electron.shell.openExternal(link)
    },
    // Optional Functions
    testFullHD: function() {
      const url = this.videoUrl;
      const audioOutput = path.resolve(__dirname, 'sound.mp4');
      const mainOutput = path.resolve(__dirname, 'output.mp4');

      ytdl(url, {
        filter: format => {
          return format.container === 'm4a' && !format.encoding;
        }
      })
        .on('progress', (chunkLength, downloaded, total) => {
          this.totalSize = (total / 1024 / 1024).toFixed(2) + 'MB';
          // this.totalSize = total
          const floatDownloaded = downloaded / total;
          this.currentProgress = (floatDownloaded * 100 / 2).toFixed(0);
          // this.remainingTime = ((Date.now() - starttime) / 1000 / 60).toFixed(2)
          this.isDownloading = true;
        })
        // Write audio to file since ffmpeg supports only one input stream.
        .pipe(fs.createWriteStream(audioOutput))
        .on('finish', () => {
          ffmpeg()
            .input(
              ytdl(url, {
                filter: format => {
                  return format.container === 'mp4' && !format.audioEncoding;
                }
              }).on('progress', (chunkLength, downloaded, total) => {
                this.totalSize = (total / 1024 / 1024).toFixed(2) + 'MB';
                // this.totalSize = total
                const floatDownloaded = downloaded / total;
                this.currentProgress = (floatDownloaded * 100 / 2 + 50).toFixed(
                  0
                );
                // this.remainingTime = ((Date.now() - starttime) / 1000 / 60).toFixed(2)
                this.isDownloading = true;
              })
            )
            .videoCodec('copy')
            .input(audioOutput)
            .audioCodec('copy')
            .save(mainOutput)
            .on('error', console.error)
            .on('end', () => {
              fs.unlink(audioOutput, err => {
                if (err) console.error(err);
                else console.log('\nfinished downloading');
              });
              this.isDownloading = false;
              this.currentProgress = 0;
            });
        });
    },
    getFullInfo: function() {
      ytdl.getInfo(this.videoUrl, (err, info) => {
        console.log(info);
      });
    },
    dlHighest: function() {
      youtubedl.exec(
        this.videoUrl,
        ['-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]'],
        {},
        function exec(err, output) {
          'use strict';
          if (err) {
            throw err;
          }
          console.log(output.join('\n'));
        }
      );
    },
    getVideoFormats: function() {
      ytdl.getInfo(this.videoUrl).then(data => {
        console.log(data);
      });
      ffmpeg.getAvailableFormats(function(err, formats) {
        console.log('Available formats:');
        console.dir(formats);
      });

      ffmpeg.getAvailableCodecs(function(err, codecs) {
        console.log('Available codecs:');
        console.dir(codecs);
      });

      ffmpeg.getAvailableEncoders(function(err, encoders) {
        console.log('Available encoders:');
        console.dir(encoders);
      });

      ffmpeg.getAvailableFilters(function(err, filters) {
        console.log('Available filters:');
        console.dir(filters);
      });
    },
    // Main Function
    downloadFile: function() {
      if (
        this.videoUrl.includes('playlist') ||
        this.videoUrl.startsWith('PL')
      ) {
        this.dlPlaylist();
      } else {
        this.dlSingle();
      }
    },
    // Playlist Download
    dlPlaylist() {
      var currentPlaylistID;

      this.videoUrl.startsWith('PL')
        ? (currentPlaylistID =
            'https://www.youtube.com/playlist?list=' + this.videoUrl)
        : (currentPlaylistID = this.videoUrl);

      ypi(this.ytAPI, currentPlaylistID.split('=')[1]).then(items => {
        for (var i = 0; i < items.length; i++) {
          this.playlistVideos.push({
            id: items[i].resourceId.videoId,
            title: items[i].title
          });
        }
        console.log('Total Files: ' + this.playlistVideos.length);
        this.dlPlaylistDownload();
      });
    },
    dlPlaylistDownload() {
      if (!fs.existsSync(this.currentSaveFolder)) {
        fs.mkdirSync(this.currentSaveFolder);
      }

      var video = youtubedl(
        'http://www.youtube.com/watch?v=' +
          this.playlistVideos[this.currentVideo].id
      );
      var audioConvert = ffmpeg(video);

      var data = null;
      var error = null;
      var pos = 0;
      var output;

      video.on('info', info => {
        if (this.isAudio == 'Audio') {
          audioConvert.toFormat('mp3');
          // audioConvert.audioQuality(0);
          audioConvert.audioChannels(2);
          audioConvert.audioBitrate(this.audioQuality);
        }

        //Currently Downloading File
        console.log('Downloading:' + info._filename);
        this.videoTitle = this.playlistVideos[this.currentVideo].title
        // Rename Unusable Characters in File Name
        this.videoTitle = this.videoTitle.replace(/[\/:*?"<>|│]/g, '_');
        this.playlistVideoSize = info.size;
        if (this.isAudio == 'Video') {
          output = path.join(this.currentSaveFolder + this.videoTitle + '.mp4');
          video.pipe(fs.createWriteStream(output));
        } else {
          // output = path.join(this.currentSaveFolder + this.videoTitle + '.mp3');
          audioConvert.save(this.currentSaveFolder + this.videoTitle + '.mp3');
        }
      });

      video.on(
        'data',
        (data = chunk => {
          this.isDownloading = true;
          pos += chunk.length;
          this.currentProgress = (pos / this.playlistVideoSize * 100).toFixed(
            0
          );
        })
      );

      video.on('error', error = (err) => {
        console.log('error 2:', err);
        console.log('THIS VIDEO SKIPPED');
        if (this.currentVideo != this.playlistVideos.length - 1) {
          this.currentVideo++;
        } else {
          this.isDownloading = false;
          this.currentProgress = 0;
          this.playlistVideos = [];
          // this.warnMe();
          this.currentVideo = 0;
          return false;
        }

        // Call Same Function for Next Video on Array
        this.dlPlaylistDownload();
      });
      video.on('end', () => {
        console.log('Tamamlandı');
        if (this.currentVideo != this.playlistVideos.length - 1) {
          this.currentVideo++;
        } else {
          this.isDownloading = false;
          this.currentProgress = 0;
          this.playlistVideos = [];
          // this.warnMe();
          this.currentVideo = 0;
          return false;
          this.runToaster();
        }

        // Call Same Function for Next Video on Array
        this.dlPlaylistDownload();
      });
    },
    dlSingle(){

      console.log(resolve('./icon.png'));
      if (!fs.existsSync(this.currentSaveFolder)) {
        fs.mkdirSync(this.currentSaveFolder);
      }

      var currentVideoID;

      this.videoUrl.includes('watch?v=')
        ? (currentVideoID = this.videoUrl.split('=')[1])
        : (currentVideoID = this.videoUrl);

      var video = youtubedl(
        'http://www.youtube.com/watch?v=' +
          currentVideoID
      );
      var audioConvert = ffmpeg(video);

      var data = null;
      var pos = 0;
      var output;

      console.log('Total Files: ' + this.playlistVideos.length);

      video.on('info', info => {
        if (this.isAudio == 'Audio') {
          audioConvert.toFormat('mp3');
          // audioConvert.audioQuality(0);
          audioConvert.audioBitrate(this.audioQuality);
          audioConvert.audioChannels(2);
        }

        //Currently Downloading File
        console.log('Downloading:' + info._filename);
        this.videoTitle = info.title;
        // Rename Unusable Characters in File Name
        this.videoTitle = this.videoTitle.replace(/[\/:*?"<>|│]/g, '_');
        this.playlistVideoSize = info.size;
        if (this.isAudio == 'Video') {
          output = path.join(this.currentSaveFolder + this.videoTitle + '.mp4');
          video.pipe(fs.createWriteStream(output));
        } else {
          // output = path.join(this.currentSaveFolder + this.videoTitle + '.mp3');
          audioConvert.save(this.currentSaveFolder + this.videoTitle + '.mp3');
        }
      });

      video.on(
        'data',
        (data = chunk => {
          this.isDownloading = true;
          pos += chunk.length;
          this.currentProgress = (pos / this.playlistVideoSize * 100).toFixed(
            0
          );
        })
      );
      video.on('end', () => {
          if (this.isSubtitle) {
            this.downloadCaptions();
          }
          if (this.startTime !== '' && this.endTime !== '') {
            this.calculateRange();

            ffmpeg(this.currentSaveFolder + this.videoTitle + '.mp4')
              // ffmpeg(uploadPath + 'video.mp4')
              .seekInput(this.startTime)
              .duration(this.totalRangeSecond)
              .output(this.currentSaveFolder + this.videoTitle + '_cut.mp4')
              // .output(uploadPath + 'output.mp4')

              .on('end', function(err) {
                if (!err) {
                  console.log('conversion Done');
                  fs.unlink(this.currentSaveFolder + this.videoTitle + '.mp4', err => {
                    if (err) console.error(err);
                    else console.log('\nfinished downloading');
                  });
                }
              })
              .on('error', function(err) {
                console.log('error: ', +err);
              })
              .run()
            // this.warnMe();
            this.currentProgress = 0;
            this.isDownloading = false;
            this.runToaster();
            this.videoTitle = 'No Download Queue Currently'
          } else {
            // this.warnMe();
            this.currentProgress = 0;
            this.isDownloading = false;
            this.runToaster();
            this.videoTitle = 'No Download Queue Currently'
          }
      });
    },

    // Single file Download
    dlSingleBackup() {
      if (!fs.existsSync(this.currentSaveFolder)) {
        fs.mkdirSync(this.currentSaveFolder);
      }

      var currentVideoID;

      this.videoUrl.includes('watch?v=')
        ? (currentVideoID = this.videoUrl.split('=')[1])
        : (currentVideoID = this.videoUrl);

      console.log(currentVideoID);

      var video = youtubedl(
        'http://www.youtube.com/watch?v=' + currentVideoID,
        ['-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]']
      );

      var audioConvert = ffmpeg(video);

      var data = null;
      var pos = 0;
      var output;

      video.on('info', info => {
        if (this.isAudio == 'Audio') {
          audioConvert.toFormat('mp3');
          audioConvert.audioBitrate(this.audioQuality);
          // audioConvert.audioQuality(128);
          audioConvert.audioChannels(2);
        }

        // audioConvert.size(this.videoQuality)

        //Currently Downloading File
        console.log('Downloading:' + info._filename);
        this.videoTitle = info.title;
        // Rename Unusable Characters in File Name
        this.videoTitle = this.videoTitle.replace(/[\/:*?"<>|│]/g, '_');
        this.playlistVideoSize = info.size;
        if (this.isAudio == 'Video') {
          output = path.join(
            this.currentSaveFolder +
              this.videoTitle +
              '_' +
              this.videoQuality +
              '.mp4'
          );
          video.pipe(fs.createWriteStream(output));
          // audioConvert.save(this.currentSaveFolder + this.videoTitle + '_' + this.videoQuality + '.mp4');
        } else {
          // output = path.join(this.currentSaveFolder + this.videoTitle + '.mp3');
          audioConvert.save(
            this.currentSaveFolder +
              this.videoTitle +
              '_' +
              this.audioQuality +
              '.mp3'
          );
        }
      });

      video.on(
        'data',
        (data = chunk => {
          this.isDownloading = true;
          pos += chunk.length;
          this.currentProgress = (pos / this.playlistVideoSize * 100).toFixed(
            0
          );
        })
      );
      video.on('end', () => {
        console.log('Tamamlandı');
        this.isDownloading = false;
        this.currentProgress = 0;
        // this.warnMe();
      });
    },
    pasteUrl: function() {
      let copiedUrl = clipboardy.readSync();
      this.videoUrl = copiedUrl;
      console.log(copiedUrl);
    },
    openSaveFolder: function() {
      ipcRenderer.send('select-folder');
      ipcRenderer.on('selected-directory', (event, path) => {
        this.currentSaveFolder = `${path}${directorySeparator}`;
        console.log(this.currentSaveFolder);
      });

      // ipcRenderer.on('selected-directory', (event, path) => {
      //   document.getElementById('selected-file').innerHTML = `You selected: ${path}`
      // })
      console.log('Browse clicked');
    },
    openFile: function() {
      ipcRenderer.send('select-file');
      ipcRenderer.on('selected-file', (event, path) => {
        this.fileName = `${path}`;
        console.log(this.fileName);
      });

      // ipcRenderer.on('selected-directory', (event, path) => {
      //   document.getElementById('selected-file').innerHTML = `You selected: ${path}`
      // })
      console.log('Browse clicked');
    },
    calculateRange: function() {
      // Start Time
      let calculatedStartTimeValues = this.startTime.split(':');
      let totalStartTimeSecond =
        parseInt(calculatedStartTimeValues[0]) * 60 * 60 +
        parseInt(calculatedStartTimeValues[1]) * 60 +
        parseInt(calculatedStartTimeValues[2]);

      // End Time
      let calculatedEndTimeValues = this.endTime.split(':');
      let totalEndTimeSecond =
        parseInt(calculatedEndTimeValues[0]) * 60 * 60 +
        parseInt(calculatedEndTimeValues[1]) * 60 +
        parseInt(calculatedEndTimeValues[2]);

      // Calculations
      this.totalRangeSecond = totalEndTimeSecond - totalStartTimeSecond;
      // console.log(this.totalRangeSecond);
      // console.log(this.startTime)
    },
    warnMe: function() {
      this.$toast.open({
        duration: 5000,
        message: `${this.isAudio} Downloaded`,
        position: 'is-bottom'
      });
    },
    downloadVideo() {
      ytdl.getInfo(this.videoUrl).then(data => {
        this.videoTitle = data.title;
        this.videoTitle = this.videoTitle.replace(/[\/:*?"<>|│]/g, '_');

        if (!fs.existsSync(this.currentSaveFolder)) {
          fs.mkdirSync(this.currentSaveFolder);
        }

        const output = path.resolve(
          this.currentSaveFolder + this.videoTitle + '.mp4'
        );
        // const output = path.resolve(uploadPath + 'video.mp4')
        const video = ytdl(this.videoUrl);

        video.pipe(fs.createWriteStream(output));

        // this.downloadCaptions();
        video.on('progress', (chunkLength, downloaded, total) => {
          this.totalSize = (total / 1024 / 1024).toFixed(2) + 'MB';
          // this.totalSize = total
          const floatDownloaded = downloaded / total;
          this.currentProgress = (floatDownloaded * 100).toFixed(0);
          // this.remainingTime = ((Date.now() - starttime) / 1000 / 60).toFixed(2)
          this.isDownloading = true;
        });
        video.on('end', () => {
          // Video Cut Part
          if (this.startTime !== '' && this.endTime !== '') {
            this.calculateRange();

            ffmpeg(this.currentSaveFolder + this.videoTitle + '.mp4')
              // ffmpeg(uploadPath + 'video.mp4')
              .seekInput(this.startTime)
              .duration(this.totalRangeSecond)
              .output(this.currentSaveFolder + this.videoTitle + '_cut.mp4')
              // .output(uploadPath + 'output.mp4')

              .on('end', function(err) {
                if (!err) {
                  console.log('conversion Done');
                }
              })
              .on('error', function(err) {
                console.log('error: ', +err);
              })
              .run();
            // this.warnMe();
            this.runToaster();
            this.currentProgress = 0;
            this.isDownloading = false;
          } else {
            // this.warnMe();
            this.currentProgress = 0;
            this.isDownloading = false;
            this.runToaster();
          }
        });

        if (this.isSubtitle) {
          this.downloadCaptions();
        }
      });
    },
    downloadAudio() {
      if (!fs.existsSync(this.currentSaveFolder)) {
        fs.mkdirSync(this.currentSaveFolder);
      }
      ytdl.getInfo(this.videoUrl).then(data => {
        this.videoTitle = data.title;
        this.videoTitle = this.videoTitle.replace(/[\/:*?"<>|│]/g, '_');

        let stream = ytdl(this.videoUrl);
        let converter = ffmpeg(stream);
        converter.toFormat('mp3');
        converter.audioQuality(0);
        converter.audioChannels(2);
        // converter.fps(data.formats[5].fps);
        // converter.videoCodec('libx264');
        // converter.size(data.formats[5].size);

        // Events
        converter.on('start', () => {
          console.log('Başladı');
        });

        stream.on('progress', (chunkLength, downloaded, total) => {
          this.totalSize = (total / 1000 / 1000).toFixed(2) + 'MB';
          // this.totalSize = total
          const floatDownloaded = downloaded / total;
          this.currentProgress = (floatDownloaded * 100).toFixed(0);
          // this.remainingTime = ((Date.now() - starttime) / 1000 / 60).toFixed(2)
          this.isDownloading = true;
        });

        converter.on('end', () => {
          // this.warnMe();
          this.currentProgress = 0;
          this.isDownloading = false;
        });

        converter.save(this.currentSaveFolder + this.videoTitle + '.mp3');
      });
    },
    downloadCaptions() {
      ytdl.getInfo(this.videoUrl, (err, info) => {
        // this.videoTitle = info.title
        // this.videoTitle = this.videoTitle.replace(/[\/:*?"<>|│]/g,'_');

        if (err) throw err;
        const tracks =
          info.player_response.captions.playerCaptionsTracklistRenderer
            .captionTracks;
        // console.log("Tracks:" + tracks)
        if (tracks && tracks.length) {
          // console.log('Found captions for',tracks.map(t => t.name.simpleText).join(', '));
          const track = tracks.find(t => t.languageCode === 'tr');
          // console.log("Trackkkkk:" + track)
          if (track) {
            console.log('Retrieving captions:', track.name.simpleText);
            console.log('URL', track.baseUrl);
            this.subtitleURL = track.baseUrl;
            this.convertSubtitles();
            const output = `${this.videoTitle}.${track.languageCode}.xml`;
            console.log('Saving to', output);
            https.get(track.baseUrl, res => {
              res.pipe(fs.createWriteStream(path.resolve(__dirname, output)));
            });
          } else {
            console.log('Could not find captions for', 'tr');
          }
        } else {
          console.log('No captions found for this video');
        }
      });
    },
    convertSubtitles() {
      axios.get(this.subtitleURL).then(response => {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(response.data, 'text/xml');

        for (let i = 0; i < xmlDoc.getElementsByTagName('text').length; i++) {
          let captionStartTime = moment
            .utc(
              moment
                .duration(
                  parseFloat(
                    xmlDoc.getElementsByTagName('text')[i].getAttribute('start')
                  ),
                  'seconds'
                )
                .asMilliseconds()
            )
            .format('HH:mm:ss,SSS');
          let captionEndTime = moment
            .utc(
              moment
                .duration(
                  parseFloat(
                    xmlDoc.getElementsByTagName('text')[i].getAttribute('start')
                  ) +
                    parseFloat(
                      xmlDoc.getElementsByTagName('text')[i].getAttribute('dur')
                    ),
                  'seconds'
                )
                .asMilliseconds()
            )
            .format('HH:mm:ss,SSS');

          xmlDoc.getElementsByTagName('text')[i].getAttribute('dur') == null
            ? (captionEndTime = moment
                .utc(
                  moment
                    .duration(
                      parseFloat(
                        xmlDoc
                          .getElementsByTagName('text')
                          [i].getAttribute('start')
                      ) + 1,
                      'seconds'
                    )
                    .asMilliseconds()
                )
                .format('HH:mm:ss,SSS'))
            : null;

          let willAddSubtitle =
            i +
            1 +
            '\n' +
            captionStartTime +
            ' --> ' +
            captionEndTime +
            '\n' +
            xmlDoc.getElementsByTagName('text')[i].childNodes[0].nodeValue +
            '\n';

          if (willAddSubtitle.includes('&#39;')) {
            let newwillAddSubtitle = willAddSubtitle.replace('&#39;', "'");
            willAddSubtitle = newwillAddSubtitle;
          }

          console.log(willAddSubtitle);
          fs.appendFile(
            this.currentSaveFolder + this.videoTitle + '.srt',
            willAddSubtitle,
            err => {
              if (err) throw err;
            }
          );
        }
      });
    },

    // Paid Functions
    convertGIF() {},
    convertMP3() {
      let converter = ffmpeg(this.fileName);
      converter.toFormat('mp3');
      converter.audioQuality(0);
      converter.audioChannels(2);
      // converter.fps(data.formats[5].fps);
      // converter.videoCodec('libx264');
      // converter.size(data.formats[5].size);

      // Events
      converter.on('start', () => {
        console.log('Başladı');
        this.isDownloading = true;
      });

      converter.on('end', () => {
        // this.warnMe();
        this.currentProgress = 0;
        this.isDownloading = false;
        this.fileName = 'Select Your File';
      });

      converter.save(this.currentSaveFolder + 'Converted.mp3');
    },
    cutVideo() {}
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,400i,500,500i,600,600i,700,700i');
</style>