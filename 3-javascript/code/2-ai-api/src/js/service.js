const APIKEY = `AIzaSyDLW8a5XxLz-FG_AT7DJBa6v4gYdF5csqk`;
const APIURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;

const getAPI = async (req) => {
  const res = await fetch(APIURL, {
    method: "POST",
    headers: {
      "x-goog-api-key": APIKEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: req }],
        },
      ],
    }),
  });
  const data = await res.json();
  const response = data.candidates[0].content.parts[0].text;
  return response;
};
export default getAPI;
