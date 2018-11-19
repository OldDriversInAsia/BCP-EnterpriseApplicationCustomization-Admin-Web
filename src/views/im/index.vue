<template style='height:100%'>
  <el-container style='height:100%'>
    <el-aside width='300px'>
      <el-header>
        <el-input placeholder="搜索联系人..."></el-input>
      </el-header>
        <ul>
          <li v-for="item in chatList">
            <img :src='default_avatar' class='chatAvatar'/>
            <div class="chatItemName">{{item.name}}</div>
          </li>
      </ul>
    </el-aside>
    <el-container class="rightSection">
      <el-header>
        <span style='float:left'>{{currentChat.name}}</span>
      </el-header>
      <el-main>
        <ul>
          <li v-for='item in messageList' class='messageLi'>
            <div v-if="item.isMyMessage" class="messageDiv messageDivRight">
              <div v-if="item.isMyMessage" class='messageDivBoxRight'>
                <div class='messageDivContent messageDivContentRight'>
                  <pre>{{item.content}}</pre>
                </div>
              </div>
              <div class='messageDivAvatar messageDivAvatarRight'>
                <img :src='default_avatar' class='messageAvatar'/>
              </div>
            </div>

            <div v-if="!item.isMyMessage" class="messageDiv messageDivLeft">
              <div class='messageDivAvatar messageDivAvatarLeft'>
                <img :src='default_avatar' class='messageAvatar'/>
              </div>
              <div class='messageDivBoxLeft'>
                <div class='messageDivUserNameLeft'>{{item.fromUserName}}</div>
                <div class='messageDivContent messageDivContentLeft'>
                  <pre>{{item.content}}</pre>
                </div>
              </div>
            </div> 
          </li>
        </ul>
      </el-main>
      <el-footer>
        <el-input v-model="message" placeholder="请输入内容" type="text" @keyup.enter.native="sendMessage"></el-input>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Vue from 'vue'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import chatList from '../../components/im'
import default_avatar from '@/assets/im/default.jpg'
Vue.use(chatList)
export default {
  data() {
    return {
      messageSpanRightClass: 'messageSpanRight',
      messageSpanLeftClass: 'messageSpanLeft',
      messageSpanClass: 'messageSpan',
      list: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      messageList: [],
      message: '',
      currentChat: {
        name: 'Van赫のda♂rk情報局(7)'
      },
      chatList: [
        {
          name: 'Van赫のda♂rk情報局'
        },
        {
          name: '不正常人类研究中心'
        }
      ],
      default_avatar
    }
  },
  created() {
    this.initWebSocket()
  },
  methods: {
    initWebSocket() {
      this.socket = new SockJS('http://kiseki.cf/api/websocket')
      this.stompClient = Stomp.over(this.socket)
      this.stompClient.connect({}, (frame) => {
        this.stompClient.subscribe('/topic/greetings', (msg) => {
          console.log(msg)
          var message = JSON.parse(msg.body)
          this.messageList.push({ content: message.content, isMyMessage: false })
        })
      }, () => {

      })
      console.log('Hello World!')
    },
    sendMessage() {
      if (this.message === '') {
        return
      }
      console.log(this.message)
      this.stompClient.send('/app/im/sendMessage', {}, JSON.stringify({ content: this.message }))
      this.messageList.push({ content: this.message, isMyMessage: true })
      this.message = ''
    }
  }
}
</script>
<style>
  .app-main {
    height: 100%
  }
  .main-container {
    height: 100%
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /*line-height: 100%;*/
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-header{
    background-color: #FFF;
  }
  .el-main{
    background-color: #f6f6f9;
  }
  .el-footer{
    background-color: #f6f6f9;
  }
  .el-aside{
    background-color: #f4f5f7;
  }
  .rightSection {
    box-shadow: -2px 0 6px rgba(182,187,201,.3);    
  }
  li, ul {
    list-style: none;
  }
  .chatAvatar {
    height: 50px;
    width: 50px;
    border-radius:50%;
    overflow:hidden;
    float: left;
  }
  .el-aside ul{
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
  }

  .el-aside li{
    line-height: 60px;
    margin-bottom: 10px;
    margin-top: 5px;
    padding-left: 20px;
  }
  .chatItemName{
    display: flex;
    margin-left: 80px;
  }

  .el-main ul{
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0; 
  }
  .messageLi{
    height:30px;
    margin-bottom: 10px;
  }
  .messageDiv{
    height: 100%;
    display: flex;
    flex-direction: row;
  }
  .messageDivAvatar{
    height: 30px;
    width: 30px;
  }
  .messageDivRight{
    float: right;
  }
  .messageDiv .contentDiv{
    background-color: #FFF;
    border-radius:5px;
  }
  .messageDiv pre{
    background-color: #FFF;
    letter-spacing: 0;
    max-width: 420px;
    padding: 10px;
    border-top-left-radius: 0;
    margin: 0;
    line-height: 20px;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
    word-break: break-all;
  }
  .messageDivContent{
    margin-left: 20px;
    margin-right: 20px;
  }
  .messageSpan {
    word-break:break-all;
    display:table;
    height: 10px;
  }
  .messageAvatar{
    height: 30px;
    width: 30px;
    border-radius:50%;
    overflow:hidden;
    float: left;
  }

  
</style>