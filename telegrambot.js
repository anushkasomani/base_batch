const BOT_TOKEN = "7848094922:AAEoTvbZgu58SUiauyu4TNP61ZWo5F9NNqg";
const CHAT_ID = "-1002668376054";
const IMAGE_URL =
  "https://d27jswm5an3efw.cloudfront.net/app/uploads/2019/08/image-url-3.jpg";

const CAPTION = `
🎨 *Art Title:* Peaceful Horizons  
📖 *Story:* This picture expresses calmness and the universal hope for peace.
`;

const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;

const payload = {
  chat_id: CHAT_ID,
  photo: IMAGE_URL,
  caption: CAPTION,
  parse_mode: "Markdown",
};

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error("Error:", err));
