import React from 'react';
import ImgCrop from 'antd-img-crop';
import { Upload, Modal, Input, Select, Typography, Button, DatePicker, Spin, Progress, message } from 'antd';
import { firestore, auth } from './firebase';
import { uploadFBImage } from './Helper';
import './App.css';
import moment from 'moment';

function App () {
  const [ fileList, setFileList ] = React.useState([]);
  const [ state, setState ] = React.useState({
    previewVisible: false,
    previewTitle: '',
    previewImage: '',
    eventCategories: [],
    companyName: '',
    email: '',
    password: '',
    followers: [],
    following: [],
    twittter: '',
    linkedin: '',
    whatsapp: '',
    facebook: '',
    twitter: '',
    youtube: '',
    file: {},
    progress: 0,
    companyAddress: '',
    dateCreated: '',
    companyType: 'Community organisation',
    companyDescription: '',
    accountType: 'company',
    loading: false
  });

  React.useEffect(() => {
    // console.log('Firebase', firestore);
    // login();
    // createUserFirestore('KZEstJhet3hlBw8DoL8tyXB5wxxx');
  });

  const onChange = ({ fileList: newFileList }) => {
    // console.log('File here', newFileList[0]);
    setFileList(newFileList);
    setState({ ...state, file: newFileList && newFileList[0].originFileObj });
  };

  const createError = (error) => {
    message.error(error);
    setState({ ...state, loading: false });
  };

  const createAccount = async () => {
    setState({ ...state, loading: true });
    const { email, password, companyName, companyType, dateCreated, eventCategories, file } = state;
    if (!email) return createError('Company / organisation email address is required');
    if (!password) return createError('Password is required');
    if (!companyName) return createError('Company / organisation name is required');
    if (!companyType) return createError('Company / organisation type is required');
    if (!dateCreated) return createError('Date company / organisation was created is required');
    if (!eventCategories.length) return createError('Event Categories are required');
    if (!file.name) return createError('A profile photo for the company / organisation is required');

    try {
      const acc = await auth.createUserWithEmailAndPassword(email, password);
      // await auth.signInWithEmailAndPassword(email, password);
      createUserFirestore(acc.user.uid);
    } catch (error) {
      createError(error.message);
    }
  };

  const createUserFirestore = async (uid) => {
    console.log('here in create a new doc', uid);
    const { previewVisible, previewTitle, previewImage, file, progress, loading, password, ...payload } = state;

    const dateCreated = moment(state.dateCreated).format('DD-MMMM-YYYY');

    try {
      await firestore
        .collection('Users')
        .doc(uid)
        .set({ ...payload, dateCreated, uid }, { merge: true })
        .then(() => uploadImage(uid));
    } catch (error) {
      createError(error.message);
    }
  };

  const uploadImage = (uid) =>
    uploadFBImage(
      state.file,
      uid,
      (progress) => setState({ ...state, progress, loading: progress !== 100 }),
      (error) => createError(error.message),
      (url) => updateImageUrl(url, uid)
    );

  const updateImageUrl = (imageUrl, uid) =>
    firestore
      .collection('Users')
      .doc(uid)
      .set({ imageUrl }, { merge: true })
      .then(() => {
        setState({ loading: false, progress: 0 });
        setFileList([]);
        message.success(
          'Successfully created your company / organisation account, await on the next steps on this beautiful journey'
        );
      })
      .catch((error) => createError(error.message));

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onPreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    });
  };

  const OPTIONS = [ 'Competitions', 'Performances', 'Workshops', 'Classes', 'Festivals' ];

  const CATEGORIES = [
    'Non Gvernmental Organisation (NGO)',
    'Community organisation',
    'Dance group',
    'Charity organisation'
  ];

  const filteredOptions = (filters, stet) => filters.filter((o) => stet && !stet.includes(o));

  return (
    <div className="App">
      <Modal
        visible={state.previewVisible}
        title={state.previewTitle}
        footer={null}
        onCancel={() => setState({ ...state, previewVisible: false })}
      >
        <img alt="example" style={{ width: '100%' }} src={state.previewImage} />
      </Modal>
      <div id="image-container">
        <ImgCrop rotate>
          <Upload
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            // customRequest={() => null}
            // percent={90}
            // action={null}
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            id="image-container-inner"
          >
            {fileList.length < 1 && '+ Upload cover image'}
            {/* {fileList && fileList.length && fileList.length === 1 ? (
              <img src={fileList[0]} style={{ width: '200px', height: '200px' }} />
            ) : (
              '+ Upload cover image'
            )} */}
          </Upload>
        </ImgCrop>
        {<Progress percent={state.progress} trailColor="#aaaaaa30" />}
      </div>
      {/* <Spin spinning={false}> */}
      <div id="form-container">
        <Typography.Title level={4}>Enter company / organisation details:</Typography.Title>
        <Typography.Paragraph level={4}>
          Please ensure to enter all the relevant details in order to complete your company registration successfully.
        </Typography.Paragraph>
        <Input
          value={state.companyName}
          onChange={({ target: { value: companyName } }) => setState({ ...state, companyName })}
          className="form-elements"
          placeholder="Company name"
          size="large"
        />
        <Input
          value={state.email}
          onChange={({ target: { value: email } }) => setState({ ...state, email })}
          className="form-elements"
          placeholder="Company email e.g company@email.com"
          size="large"
          type="email"
        />
        <Input
          value={state.companyAddress}
          onChange={({ target: { value: companyAddress } }) => setState({ ...state, companyAddress })}
          className="form-elements"
          placeholder="Company address"
          size="large"
        />
        <DatePicker
          className="form-elements"
          size="large"
          placeholder="Date company was established "
          format="DD-MMMM-YYYY"
          value={state.dateCreated}
          onChange={(date) => setState({ ...state, dateCreated: date })}
          defaultValue={new Date()}
        />

        <Select
          mode="multiple"
          placeholder="Select company event categories"
          value={state.eventCategories}
          onChange={(eventCategories) => setState({ ...state, eventCategories })}
          style={{ width: '100%' }}
          size="large"
          className="form-elements"
        >
          {filteredOptions(OPTIONS, state.eventCategories).map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>

        <Select
          // mode="multiple"
          placeholder="Select type of company"
          value={state.companyType}
          onChange={(companyType) => setState({ ...state, companyType })}
          style={{ width: '100%' }}
          size="large"
          className="form-elements"
        >
          {CATEGORIES.map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
        <Input.TextArea
          autoSize={{ minRows: 5 }}
          // style={{ minHeight: '200px' }}
          className="form-elements"
          showCount
          value={state.companyDescription}
          onChange={({ target: { value: companyDescription } }) => setState({ ...state, companyDescription })}
          maxLength={500}
          placeholder="Brief description of the company in 500 words"
        />
        <Input.Password
          className="form-elements"
          size="large"
          placeholder="Set account password"
          value={state.password}
          onChange={({ target: { value: password } }) => setState({ ...state, password })}
        />
        <Button size="large" id="submit-button" onClick={createAccount} loading={state.loading}>
          Create company profile
        </Button>
      </div>
      {/* </Spin> */}
    </div>
  );
}

export default App;
