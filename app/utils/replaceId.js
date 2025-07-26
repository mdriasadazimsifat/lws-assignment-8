export default function replaceId(obj = {}) {
  if (obj._id) {
    const { _id, ...updatedObj } = { id: obj._id.toString(), ...obj };

    return updatedObj;
  }

  return obj;
}
