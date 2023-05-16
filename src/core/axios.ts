import axios, { CreateAxiosDefaults } from 'axios';

const defaultConfigs: CreateAxiosDefaults = {
  baseURL: process.env.REACT_APP_BUDGET_MANAGEMENT_API,
  withCredentials: true,
  timeout: process.env.NODE_ENV === 'production' ? 8000 : undefined,
  headers: {
    'Content-Type': 'application/json',
  }
};

const instance = axios.create(defaultConfigs);

export * from 'axios';
export default instance;
