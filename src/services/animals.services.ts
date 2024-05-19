import animalsModel from "../models/animals.models";


const getAllDogsPage = async (page: number) => {
  const limit = 6;
  const skip = (page - 1) * limit;

  const dogs = await animalsModel.find({ type: 'dogs' })
    .skip(skip)
    .limit(limit);

  if (dogs.length === 0)
    return { message: 'NO_DOCUMENTS_DOG' };

  return dogs;

};

export { getAllDogsPage };