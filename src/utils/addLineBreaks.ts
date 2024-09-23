export const addLineBreaks = (text: string) => {
  return text.replace(/\n/g, "<br />");
};

export const linkify = (text: string) => {
  const regex =
    /(https?:\/\/[^\s\\(\\)ㄱ-ㅎㅏ-ㅣ가-힣]+|www\.[^\s\\(\\)ㄱ-ㅎㅏ-ㅣ가-힣]+)/g;
  return text.replace(regex, (match) => {
    let href = match;
    if (!match.startsWith("http")) {
      href = `http://${match}`;
    }
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" style="color: #0645AD; text-decoration: underline; word-break: break-all; white-space: normal;">${match}</a>`;
  });
};

export const linkifyAndAddLineBreaks = (text: string) => {
  if (!text) return "";
  return addLineBreaks(linkify(text));
};
