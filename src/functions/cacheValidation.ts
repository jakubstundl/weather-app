export const verifyCityCache = (time1: number, time2: number): boolean => {
  const diffInMinutes = Math.abs(time1 - time2) / 1000 / 60;
  return diffInMinutes < 30;
};
