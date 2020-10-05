import AvailableColors from '../AvailableColors';

test('Passing unknown color should return null', () => {
  expect(AvailableColors.getColorItem({colorHex: ''})).toBeNull();
  expect(AvailableColors.getColorItem({colorHex: 'green'})).toBeNull();
  expect(
    AvailableColors.getColorItem({colorHex: 'jklhasd3fkjnadsflk'}),
  ).toBeNull();
});

test('Passing null should return null', () => {
  expect(AvailableColors.getColorItem({colorHex: null})).toBeNull();
});

test('Should return default grey color', () => {
  const defaultColor = {
    id: '19',
    color: '#E0E0E0',
  };

  expect(AvailableColors.getDefaultColor()).toEqual(defaultColor);
});

test('Should return available colors array containing default color', () => {
  const defaultColor = {
    id: '19',
    color: '#E0E0E0',
  };

  expect(AvailableColors.getColors()).toContainEqual(defaultColor);
});
