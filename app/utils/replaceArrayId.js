export default function replaceArrayId(array) {
  return array.map(({ _id, ...obj }) => {
    return {
      id: _id.toString(),
      ...obj,
    };
  });
}
