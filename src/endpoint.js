let apiURL;
// if (navigator.platform === "Win32") {
    if (location.hostname === 'localhost') {
        apiURL = "http://127.0.0.1:5000";
    } else {
        apiURL = "https://analyzespends.onrender.com";
    }
// } else {
// }
// console.log(apiURL)
export default apiURL;
