export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const allowedTypes = ['work', 'home', 'personal'];

  const parsedContactType =
    typeof contactType === 'string' && allowedTypes.includes(contactType)
      ? contactType
      : undefined;

  const parsedIsFavourite =
    isFavourite === 'true' ? true : isFavourite === 'false' ? false : undefined;

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
