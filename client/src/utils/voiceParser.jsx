export const parseVoiceInput = (text) => {
  const textLower = text.toLowerCase();
  const amountMatch = textLower.match(/(?:rupees|rs|dollar|dollars|\$)\s*(\d+)|(\d+)/);
  if (!amountMatch) return null;
  const amount = parseInt(amountMatch[1] || amountMatch[2], 10);
  let note = textLower.split(/(?:rupees|rs|dollar|\d+)/)[0].trim();
  note = note.replace(/^add |^log |^expense /i, '').trim();
  return { amount, note };
};