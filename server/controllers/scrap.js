const puppeteer = require("puppeteer");
const ScrapMedia = require("../models/scrapMedia");
const ScrapUrl = require("../models/scrapUrl");

exports.storeScrapUrls = async (req, res, next) => {
  try {
    const { urls } = req.body;

    const insertData = urls.map((url) => {
      return {
        url,
        userID: req.user.id,
        status: 0,
      };
    });

    await ScrapUrl.bulkCreate(insertData);

    const data = await ScrapUrl.findAll({ userID: req.user.id, status: 0 });

    res.json({ message: "Scrapping completed", data: data });
  } catch (error) {
    next(error);
  }
};

exports.getTotalMediaCount = async (req, res, next) => {
  try {
    let count = await ScrapMedia.count({});
    res.json({ message: "Total records", data: count });
  } catch (error) {
    next(error);
  }
};

exports.getMediaPagination = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.perPage) || 10;
    const page = req.params.page;
    const offset = (page - 1) * limit;

    let count = await ScrapMedia.findAll({ offset, limit });
    res.json({ message: "Scrap records", data: count });
  } catch (error) {
    console.log(error);
    // next(error);
  }
};

const scrapData = async (url) => {
  let allData = [];

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const photos = await page.$$eval("img", (imgs) => {
    return imgs.map((x) => x.src);
  });
  const tableData = photos.map((url) => {
    return {
      fileType: "image",
      fileName: "dfd",
      url: url,
      parsedBy: req.user.id,
    };
  });
  allData.push(...tableData);

  await ScrapMedia.bulkCreate(allData);
};
