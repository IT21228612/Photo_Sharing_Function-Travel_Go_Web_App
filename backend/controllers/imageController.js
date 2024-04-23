const Image = require('../models/imageModel')

exports.uploadImage = async (req, res) => {

  const { location, date, description } = req.body;

  const files = req.files

  const savedFilenames = []

  for (const file of files) {

    savedFilenames.push("http://localhost:5000/static/images/" + file.filename); // Store saved filename
  }
  try {

    console.log("Saved file Names" + savedFilenames)
    await Image.create({
      image: savedFilenames,
      location: location,
      date: date,
      description: description
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
}



exports.getImages = async (req, res) => {
  try {
    const images = await Image.find({});
    console.log("Get images response : " + images)
    res.send({ status: "ok", data: images });
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
}

exports.updateImages = async (req, res) => {

  

  const files = req.files

  const savedFilenames = []

  for (const file of files) {

    savedFilenames.push("http://localhost:5000/static/images/" + file.filename); // Store saved filename
  }
  try {

    const id = req.params.id
    const updateBody = {
      
      image:savedFilenames,
      location: req.body.location,
      date: req.body.date,
      description: req.body.description
    }

    const updatedImage = await Image.findByIdAndUpdate(id, updateBody)

    res.status(200).json({ status: 'ok', data: updatedImage })

  } catch (error) {
    res.status(500).json({ status: error.message });
  }


}

exports.deleteImages = async (req, res) => {
  try {
    const deletedImage = await Image.findByIdAndDelete(req.params.id);
    if (!deletedImage) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

