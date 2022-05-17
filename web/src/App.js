import React, { useEffect } from 'react';
import AgoraRTM from 'agora-rtm-sdk';
import RTMClient from './RTMAdapter';

const uid = Math.random().toString(36).slice(2);
const CL = new RTMClient(uid);
const App = () => {
  // let client;
  let channel;
  const [ members, setMembers ] = React.useState([]);
  const [ message, setMessage ] = React.useState('');

  useEffect(
    () => {
      init();

      return () => {
        // leave channel
        // leaveChannel();
      };
    },
    [ uid ]
  );

  const init = async () => {
    try {
      await CL.login();
      await CL.client.setLocalUserAttributes({ uid, name: `user-${uid}` });

      await CL.joinChannel();
      await CL.channel.getMembers();

      CL.channel.on('ChannelMessage', (msg, member) => {
        console.log('New message arrived', msg);
      });

      CL.channel.on('MemberLeft', (msg, member) => {
        console.log('Member left', msg);
      });

      CL.channel.on('MemberJoined', (mId) => {
        console.log('Member joined now', mId);
      });

      await CL.joinChannel();
      // const x = await CL.channel.getMembers();
      // console.log('SSSSSS', x);
      // setMembers(x);
    } catch (error) {
      console.log('Error ++>>', error.message);
    }
  };

  const leaveChannel = async () => {
    return await CL.channel.leave();
  };

  const sendMessage = async () => {
    try {
      await CL.channel.sendMessage({ text: message }).then(() => {
        console.log('Message sent');
      });
    } catch (error) {
      console.log('Message sending failed', error.message);
    }
  };

  return (
    <div>
      {/* {.map((m) => <p>{m}</p>)} */}
      <button onClick={leaveChannel}>LEave channel</button>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          // console.log('KEy pressed', e.key);
          if (e.key === 'Enter') return sendMessage();
        }}
      />
    </div>
  );
};

export default App;
