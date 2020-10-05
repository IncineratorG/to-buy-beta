const unitsTableInitialData = {
  idPrefix: Number.MAX_SAFE_INTEGER,
  units: [
    {
      id: Number.MAX_SAFE_INTEGER - 1,
      name: 'шт',
      createTimestamp: 6,
      updateTimestamp: 6,
      editable: 0,
      deleted: 0,
      translationMark: 'units_piece',
      default: true,
    },
    {
      id: Number.MAX_SAFE_INTEGER - 2,
      name: 'кг',
      createTimestamp: 5,
      updateTimestamp: 5,
      editable: 0,
      deleted: 0,
      translationMark: 'units_kilogram',
    },
    {
      id: Number.MAX_SAFE_INTEGER - 3,
      name: 'г',
      createTimestamp: 4,
      updateTimestamp: 4,
      editable: 0,
      deleted: 0,
      translationMark: 'units_gram',
    },
    {
      id: Number.MAX_SAFE_INTEGER - 4,
      name: 'л',
      createTimestamp: 3,
      updateTimestamp: 3,
      editable: 0,
      deleted: 0,
      translationMark: 'units_liter',
    },
    {
      id: Number.MAX_SAFE_INTEGER - 5,
      name: 'мл',
      createTimestamp: 2,
      updateTimestamp: 2,
      editable: 0,
      deleted: 0,
      translationMark: 'units_milliliter',
    },
    {
      id: Number.MAX_SAFE_INTEGER - 6,
      name: 'мл',
      createTimestamp: 1,
      updateTimestamp: 1,
      editable: 0,
      deleted: 0,
      translationMark: 'units_unspecified',
      unspecified: true,
    },
  ],
};

export default unitsTableInitialData;
