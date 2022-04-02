const { Cluster } = require("puppeteer-cluster");
const Scrap = require("../models/scrap");

exports.scrapData = async (req, res, next) => {
  try {
    const { urls } = req.body;
    // let requestPromises = urls.map((url) => requestUrlData(url));
    // await Promise.all(requestPromises)
    //   .then((res) => {
    //     res.forEach((data) => {
    //       let html = data;
    //       console.log(html);
    //       //   let url = data.url;
    //       //   parseHtmlData(html, url);
    //     });
    //   })
    //   .catch((error) => {
    //     next(error);
    //   });

    let allData = [];

    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: 2,
    });

    urls.forEach((url) => {
      cluster.queue(url);
    });

    await cluster.task(async ({ page, data: url }) => {
      await page.goto(url);
      const photos = await page.$$eval("img", (imgs) => imgs.map((x) => x.src));
      const tableData = photos.map((url) => {
        return {
          fileType: "image",
          fileName: "dfd",
          url: url,
          parsedBy: req.user.id,
        };
      });
      allData.push(...tableData);
    });
    await cluster.idle();
    await cluster.close();

    await Scrap.bulkCreate(allData);

    res.json({ message: "Scrapping completed", data: allData });
  } catch (error) {
    next(error);
  }
};

const requestUrlData = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        if (res && res.status === 200) {
          res.url = url;
          resolve(res);
        } else {
          reject(res);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const parseHtmlData = async (htmlData, baseUrl) => {
  const $ = cheerio.load(htmlData);
  console.log(htmlData);
  $("img").each((index, image) => {
    let imgTag = $(image);
    let imgUrl = imgTag.attr("src");
    if (imgUrl) {
      if (imgUrl && !imgUrl.startsWith("http")) {
        imgUrl = imgUrl + img;
      }
      console.log(imgUrl);
    }
  });
};
