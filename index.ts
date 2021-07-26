import { ethers, utils } from "ethers";
import { config } from "dotenv";

config();

const viewerABI = require("./viewerABI.json");
const viewerAddress = "0x979A5902baa728034Ff342172Eda64FCe416d0a4";

const getViewerResult = async (blockNum: number) => {
  const provider = ethers.providers.getDefaultProvider(process.env.ARCHIVE_NODE);

  const viewer = new ethers.Contract(viewerAddress, viewerABI, provider);

  const result = await viewer.callStatic.shouldRebalanceWithBounds(
    utils.parseEther("1.7"),
    utils.parseEther("2.3"),
    { blockTag: blockNum }
  );

  console.log("block number: " + blockNum);
  console.log("result: " + JSON.stringify(result) + "\n");
}

const run = async () => {
  await getViewerResult(12899435);
  await getViewerResult(12899436);
  await getViewerResult(12899437);
  await getViewerResult(12899438);
  await getViewerResult(12899439);
  await getViewerResult(12899440);
}

run()