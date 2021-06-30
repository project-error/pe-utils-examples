import { ServerPromiseResp, ServerUtils } from '@project-error/pe-utils';

const svUtils = new ServerUtils();

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

RegisterCommand(
  'debugTest',
  async (src: number) => {
    try {
      // Lets call our RPC and print the result. This is a promise, so we must await
      const coordObj = await svUtils.callClientRPC<Vector3>('niceEvent', src, {
        coolStuff: 'adadadada',
        amICool: false,
      });

      console.log('Returned data:');
      console.dir(coordObj);
    } catch (e) {
      console.error(e);
    }
  },
  false,
);

interface IncomingData {
  thing1: string;
  thing2: number;
}

interface ReturnData {
  respData1: number;
  respData2: string;
}

// How we register a net promise endpoint
svUtils.onNetPromise<IncomingData, ReturnData>('promiseEvent', (req, resp) => {
  // Source can be found on request object
  const src = req.source;
  // If data was sent with the req it will be found here
  const data = req.data;

  console.dir({ src, data });

  // Now lets act like we are doing important logic here to calculate a resp
  const respData: ServerPromiseResp<ReturnData> = {
    data: {
      respData1: 100,
      respData2: 'nice',
    },
    status: 'ok',
  };

  // Now we send it back to the original client to resolve the promise
  resp(respData);
});
