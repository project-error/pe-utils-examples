import { ClientUtils, RegisterNuiCB } from '@project-error/pe-utils';

const clientUtils = new ClientUtils();

interface ServerDataObj {
  coolStuff: string;
  amICool: boolean;
}

clientUtils.registerRPCListener<ServerDataObj>('niceEvent', data => {
  const playerPed = PlayerPedId();
  // This is the optional data sent by the server, you can
  // use it for logic if needed
  console.dir(data);

  const [x, y, z] = GetEntityCoords(playerPed, false);
  // We return an object here to the server with x, y, z
  return { x, y, z };
});
