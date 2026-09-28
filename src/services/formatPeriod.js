const formatPeriod = (startDate, endDate) => {
  if (!startDate) return "";

  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;

  const startMonth = start.toLocaleDateString("en-US", {
    month: "long",
  });

  const startYear = start.getFullYear();

  if (!end) {
    return `${startMonth} ${startYear} - Present`;
  }

  const endMonth = end.toLocaleDateString("en-US", {
    month: "long",
  });

  const endYear = end.getFullYear();

  // Kalau masih di tahun yang sama
  if (startYear === endYear) {
    return `${startMonth} - ${endMonth} ${endYear}`;
  }

  return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
};

export default formatPeriod;
