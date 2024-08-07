export const googleFetch = async (): Promise<string[] | null> => {
  const apiKey = "AIzaSyCYsVjbNjZb2Sw5JdlhLt92nCDwerUPLPc";
  const spreadsheetId = "152ijgX9Pi9vO24-Wn5PIXCug6qkFwHWakaG-W4c2SFA";
  const range = "Sheet1!A1:Z100";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = (await res.json()) as { values: string[][] };
    const values = data.values;
    const [headers, ...rows] = values;
    const formattedData = rows.map((row) => {
      let obj: { [key: string]: string } = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return `name: ${obj["name"]}, age: ${obj["age"]},gender: ${obj["gender"]}`;
    });

    console.log(formattedData);
    return formattedData;
  } catch (err) {
    console.log("errors", err);
    return null;
  }
};
