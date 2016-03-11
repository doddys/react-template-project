import { STATUS_NETWORK_UPDATE } from './ActionTypes';

export function updateNetworkStatus(isConnected) {
  return {
    type: STATUS_NETWORK_UPDATE,
    isConnected,
  };
}
