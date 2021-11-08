function paginate(data, pageNumber, pageSize) {
  const currentNumber = (pageNumber - 1) * pageSize;
  const result = data.slice(currentNumber, currentNumber + pageSize);

  return result;
}

export default paginate;
