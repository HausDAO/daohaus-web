import axios from 'axios';

export const legacyGraph = async (endpoint, payload, variables) => {
  const instance = axios.create({
    endpoint,
    headers: { 'Content-Type': 'application/json' },
  });

  if (variables) {
    payload = replaceVariables(payload, variables);
  }
  try {
    return await instance.post(`${endpoint}`, payload);
  } catch (err) {
    return err.response;
  }
};

const replaceVariables = (payload, variables) => {
  console.log(payload);

  return payload;
};
