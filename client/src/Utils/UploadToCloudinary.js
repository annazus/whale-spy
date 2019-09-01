import axios from "axios";
const uploadToCloudinary = async fileToUpload => {
  const data = new FormData();

  data.append("file", fileToUpload);
  data.append("upload_preset", process.env.REACT_APP_CL_PRESET);
  data.append("cloud_name", process.env.REACT_APP_CL_CLOUD_NAME);

  const result = await axios.post(process.env.REACT_APP_CL_ENDPOINT, data);

  return result.data.url;
};

export { uploadToCloudinary };
