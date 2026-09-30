const getProjectDate = (year) => {
  if (!year) return new Date(0);

  // Ambil tahun
  const yearMatch = year.match(/\d{4}/);
  if (!yearMatch) return new Date(0);

  const projectYear = yearMatch[0];

  // Ambil bulan terakhir sebelum tahun
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthMatch = year.match(
    new RegExp(
      `(${monthNames.join("|")})(?=\\s*-?\\s*(?:${monthNames.join("|")})?\\s*${projectYear})`,
      "i",
    ),
  );

  if (!monthMatch) {
    // Kalau cuma "2025"
    return new Date(`${projectYear}-01-01`);
  }

  const monthIndex = monthNames.findIndex(
    (month) => month.toLowerCase() === monthMatch[1].toLowerCase(),
  );

  return new Date(Number(projectYear), monthIndex, 1);
};

export default getProjectDate;
