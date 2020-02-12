export const convertToSeconds = (start, end) => {
  const timeDifference = new Date(new Date(end) - new Date(start));
  return (+timeDifference.getUTCHours()) * 60 * 60 + (+timeDifference.getUTCMinutes()) * 60;
}

export const returnSplitTime = time => {
  const splitTime = time.split(":");
  return new Date(0, 0, 0, splitTime[0], splitTime[1]);
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

  return `Time: ${[hours, minutes].map(digit => digit < 10 ? "0" + digit : digit)
    .filter((time, index) => time !== "00" || index > 0)
    .join(":")}`
}
