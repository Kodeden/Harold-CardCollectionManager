import path from "path";
import { uuid } from "uuidv4";

class ImagesController {
  constructor() {}

  async createImage(req, res) {
    try {
      const files = req.files;
      const __dirname = path.resolve();
      var names = [];

      Object.keys(files).forEach((key) => {
        var newname = uuid() + files[key].name.substring(files[key].name.lastIndexOf('.'), files[key].name.length);
        const filePath = path.join(__dirname, "./images/", newname);
        names.push(newname);
        files[key].mv(filePath, (err) => {
          if (err)
            return res.status(500).json({ status: "error", message: err });
        });
      });
      console.log(names);
      return res.json({
        status: "Success",
        message: names,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ status: "error", message: e });
    }
  }
}

export default ImagesController;
