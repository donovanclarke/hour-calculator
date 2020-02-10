export const convertToSeconds = (start, end) => {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const diff = new Date(endTime - startTime);
  return (+diff.getUTCHours()) * 60 * 60 + (+diff.getUTCMinutes()) * 60;
}

export const returnSplitTime = time => {
  const value = time.split(":");
  return new Date(0, 0, 0, value[0], value[1]);
}
