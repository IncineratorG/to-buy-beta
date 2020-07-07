class AvailableColors {
  static #colors = [
    // {id: '1', color: '#FFEBEE'},
    {id: '2', color: '#F44336'},
    {id: '3', color: '#B71C1C'},
    {id: '4', color: '#F8BBD0'},
    {id: '5', color: '#880E4F'},
    {id: '6', color: '#CE93D8'},
    {id: '7', color: '#4A148C'},
    {id: '8', color: '#3F51B5'},
    {id: '9', color: '#64B5F6'},
    {id: '10', color: '#00BCD4'},
    {id: '11', color: '#26A69A'},
    {id: '12', color: '#4CAF50'},
    {id: '13', color: '#8BC34A'},
    {id: '14', color: '#D4E157'},
    {id: '15', color: '#FFEB3B'},
    {id: '16', color: '#F57F17'},
    {id: '17', color: '#BCAAA4'},
    {id: '18', color: '#795548'},
    {id: '19', color: '#E0E0E0'},
    {id: '20', color: '#546E7A'},
    {id: '21', color: '#212121'},
  ];

  static getColors() {
    return this.#colors;
  }

  static getDefaultColor() {
    return {id: '19', color: '#E0E0E0'};
  }
}

export default AvailableColors;
