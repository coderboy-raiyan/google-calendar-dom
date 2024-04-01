function eventTimeToNumber(time: string) {
  return parseFloat(time.replace(":", "."));
}

export default eventTimeToNumber;
