import { Dropbox } from 'dropbox';
import { userStore } from '../store/user';

const rootUrl = import.meta.env.PROD
  ? 'https://fooddi.netlify.app'
  : 'http://localhost:3000';

let client;

const listFolder = () => {
  const client = getClient();

  return client
    .filesListFolder({
      path: '',
    })
    .then(({ result }) => {
      return result.entries;
    })
    .catch((error) => {
      console.warn(error);
    });
};

const download = (path) => {
  const client = getClient();

  return client
    .filesDownload({ path })
    .then(async ({ result }) => {
      const data = await result.fileBlob.text();

      return JSON.parse(data);
    })
    .catch((error) => {
      // console.warn(error);
      return false;
    });
};

const upload = ({ name, content }) => {
  const client = getClient();
  const file = new File([JSON.stringify(content, null, 2)], name, {
    type: 'application/json',
  });

  return client
    .filesUpload({ path: `/${file.name}`, contents: file, mode: 'overwrite' })
    .then(() => {
      return content;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getClient = () => {
  const user = userStore();

  // create a client if it doesn't exist or if the current client
  // doesn't have the access_token
  if (!client || (user.access_token && !client.auth.accessToken)) {
    const options = {};

    if (user.access_token) {
      options.accessToken = user.access_token;
    } else {
      options.clientId = import.meta.env.VITE_DROPBOX_CLIENT_ID;
    }

    client = new Dropbox(options);
  }

  return client;
};

export const getAuthUrl = () => {
  const client = getClient();

  return client.auth.getAuthenticationUrl(`${rootUrl}/auth`).catch((error) => {
    console.warn(error);
    return false;
  });
};

export const getData = async (name) => {
  if (!name) {
    return undefined;
  }
  const fileName = `${name}.json`;
  let data = await download(`/${fileName}`);

  // create a base file if it doesn't exist
  if (!data) {
    data = await upload({ name: fileName, content: {} });
  }

  return data;
};

export const setData = async (name, data) => {
  const fileName = `${name}.json`;

  await upload({ name: fileName, content: data });
};
