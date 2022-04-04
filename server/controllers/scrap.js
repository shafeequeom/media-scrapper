const puppeteer = require("puppeteer");
const ScrapMedia = require("../models/scrapMedia");
const ScrapUrl = require("../models/scrapUrl");

exports.storeScrapUrls = async (req, res, next) => {
  try {
    const { urls } = req.body;

    const insertData = urls
      .filter((url) => url)
      .map((url) => {
        return {
          url,
          userID: req.user.id,
          status: 0,
        };
      });

    await ScrapUrl.bulkCreate(insertData);

    const data = await ScrapUrl.findAll({
      where: { userID: req.user.id, status: 0 },
    });

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

exports.scrapData = async (data, io, socket) => {
  try {
    let allData = [];

    io.to(socket.id).emit("started", data);
    await ScrapUrl.update({ status: 99 }, { where: { id: data.id } });
    let status = 2;
    if (isValidHttpUrl(data.url)) {
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const page = await browser.newPage();
      await page.goto(data.url);

      const photos = await page.$$eval("img", (imgs) => {
        return imgs.map((x) => x.src);
      });

      console.log(photos);

      const tableData = photos
        .filter((url) => checkImageURL(url))
        .map((url) => {
          let filename = url.split("/").pop();
          return {
            fileType: "image",
            fileName: filename,
            fileUrl: url,
            urlID: data.id,
          };
        });
      allData.push(...tableData);

      await ScrapMedia.bulkCreate(allData);
      status = 1;
    }

    const result = await ScrapUrl.update(
      { status },
      { where: { id: data.id } }
    );
    data.status = status;

    io.to(socket.id).emit("completed", data);

    return result;
  } catch (error) {
    console.log(error);
    await ScrapUrl.update({ status: 2 }, { where: { id: data.id } });
    data.status = 2;
    io.to(socket.id).emit("completed", data);
  }
};

const isValidHttpUrl = (string) => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
  // return false;
};

const checkImageURL = (url) => {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
};
