let apiURL;
if (navigator.platform === "Win32") {
  apiURL = "http://127.0.0.1:5001";
} else {
  apiURL = "https://analyzespends.onrender.com";
}
console.log(apiURL)
export default apiURL;
