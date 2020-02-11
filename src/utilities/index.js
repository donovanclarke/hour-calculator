export const convertToSeconds = (start, end) => {
  const diff = new Date(new Date(end) - new Date(start));
  return (+diff.getUTCHours()) * 60 * 60 + (+diff.getUTCMinutes()) * 60;
}

export const returnSplitTime = time => {
  const value = time.split(":");
  return new Date(0, 0, 0, value[0], value[1]);
}

export const isValidDate = date => {
  if (date === 0) {
    return false;
  }
  return date.toString() !== "Invalid Date";
}

export const renderTimeDisplay = range => {
  const totalSeconds = range.reduce((a, b) => ({
    difference: a.difference + b.difference
  }));
  const { difference } = totalSeconds;
  const hours = Math.floor(difference / 3600)
  const minutes = Math.floor(difference / 60) % 60
  if (hours === 0 && minutes === 0) {
    return null;
  }

  if (difference !== Number(difference)) {
    return "Looks like you may have missed something.";
  }

  return `Time: ${[hours, minutes].map(v => v < 10 ? "0" + v : v)
    .filter((v, i) => v !== "00" || i > 0)
    .join(":")}`
}
