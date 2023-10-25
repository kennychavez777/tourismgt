export const getCurrentDateAndTime = () => {
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