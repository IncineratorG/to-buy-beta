import {StyleSheet} from 'react-native';

export const productNotCompletedStyles = StyleSheet.create({
  touchable: {
    flex: 1,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'grey',
  },
  colorComponent: {
    alignSelf: 'stretch',
    width: 10,
    backgroundColor: 'grey',
  },
  infoContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  majorInfoContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  productNameContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  productName: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 18,
  },
  quantityContainer: {
    alignSelf: 'stretch',
    width: 70,
    flexDirection: 'row',
  },
  quantityCountContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  quantityCount: {
    marginLeft: 2,
    marginRight: 2,
    fontSize: 18,
  },
  quantityUnitContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityUnit: {
    marginRight: 2,
    fontSize: 18,
  },
  menuTouchable: {
    width: 30,
    height: 50,
  },
  menuContainer: {
    width: 30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  statusContainer: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  statusTouchable: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  statusNotFinished: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 6,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIcon: {
    transform: [{scale: 0.5}],
  },
  noteContainer: {
    flex: 1,
    alignSelf: 'stretch',
    borderTopColor: 'grey',
    borderTopWidth: 0.5,
  },
  note: {
    margin: 4,
    color: 'grey',
  },
});
