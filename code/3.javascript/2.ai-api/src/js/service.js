const APIKEY = `SECRET_API_KEY`;
const APIURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${APIKEY}`;

const getAPI = async (req) => {
  const res = await fetch(APIURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": APIKEY,
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
