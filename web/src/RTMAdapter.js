import RTM from 'agora-rtm-sdk';

export default class RTMClient {
  constructor (uid, channelId = 'main') {
    // super();
    this.client = RTM.createInstance('870461d718a446d3a527682015268cbb', { enableLogUpload: false });
    // this.channel = this.client.createChannel(channelId);

    this.uid = uid;
    // this.login();
    // console.log('UID--->', uid);
    // this.channeMembers = this.channel.getMembers()
  }

  async login () {
    return await this.client.login({ uid: this.uid });
  }

  async joinChannel () {
    try {
      return await this.channel.join();
    } catch (error) {
      console.log('Failed to JOIN Channel', error.message);
    }
  }

  async getChannelMembers () {
    try {
      return await this.channel.getMembers();
    } catch (error) {
      console.log('Failed to GET Channels', error.message);
    }
  }

  async leaveChannel () {
    try {
      return await this.channel.leave();
    } catch (error) {
      console.log('Failed to LEAVE Channel', error.message);
    }
  }

  getClient () {
    return this.client;
  }
}
