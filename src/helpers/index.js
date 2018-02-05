import config from './../configs';

function setConfig(section, value) {
  if (typeof value === 'string') {
    config[section] = value;
  } else {
    Object.keys(value).forEach(key => {
      config[section][key] = value[key];
    });
  }
}

export default {
  setConfig,
};
