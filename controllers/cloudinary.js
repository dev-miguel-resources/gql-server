const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImageCloud = (req, res) => {
  console.log(req.body.image);
  cloudinary.uploader
    .upload(
      req.body.image,
      (result) => {
        console.log(result);
        res.send({
          url: result.secure_url,
          public_id: result.public_id,
        });
      },
      {
        public_id: `${Date.now()}`,
        resource_type: "auto",
      }
    )
    .then((callback) => callback());
};

exports.removeImageCloud = (req, res) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (data) => {
    if (data) {
      return res.json({ data });
    } else {
      return res.json({ success: true, result });
    }
  });
};
