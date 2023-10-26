export const getCurrentDateAndTime = (): string => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Agrega 1 al mes ya que en JavaScript los meses van de 0 a 11
  const day = String(currentDate.getDate()).padStart(2, '0');

  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  const dateFormatted = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return dateFormatted;
}

export const getPostedTime = (dateTimePost: string): string => {
  const dateAndTime = new Date(dateTimePost);
  const currentDate = new Date();
  const msDiff = currentDate.getTime() - dateAndTime.getTime();

  const secs = Math.floor(msDiff / 1000);
  const mins = Math.floor(secs / 60);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 0) {
    return `Hace ${weeks} semana(s)`;
  } else if (days > 0) {
    return `Hace ${days} día(s)`;
  } else if (hours > 0) {
    return `Hace ${hours} hora(s)`;
  } else if (mins > 0) {
    return `Hace ${mins} minuto(s)`;
  } else {
    return `Hace ${secs} segundo(s)`;
  }
}