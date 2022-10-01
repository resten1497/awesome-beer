const Papa = require("papaparse");
const fs = require("fs");
const dataStream = fs.readFileSync("beer.csv", { encoding: "utf-8" });
const fsExtra = require("fs-extra");
try {
  const results = Papa.parse(dataStream, { header: true });

  fsExtra.emptyDirSync("./data/");
  console.log("✂️ 데이터 분할중 ... ");

  const breweries = results.data;
  for (let brewery of breweries) {
    let { sidoNm } = brewery;
    if (sidoNm === undefined) continue;
    let sidoNmPath = `./data/${sidoNm}.md`;
    let data = `#### [${brewery.name}](${brewery.naverUrl}) \n`;
    data += ` - 주소 : ${brewery.address}\n`;
    data += `- 종류 : ${brewery.beerType}\n`;
    data += ` - 특징 : ${brewery.desc}\n`;
    if (brewery.homepage != "") {
      data += `- [홈페이지](${brewery.homepage})\n`;
    }

    fs.appendFileSync(sidoNmPath, data);
  }

  console.log("👍 데이터 분할 완료!");
  console.log("총 " + breweries.length + " 개의 데이터를 분할했습니다.");
} catch (e) {
  console.log("❌ 데이터 분할 실패!");
}
