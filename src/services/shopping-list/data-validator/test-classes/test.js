// export const WordBuildScreenView = ({model, styles}) => {
//   const {
//     currentTask,
//     setCurrentTask,
//     numberOfTasks,
//     correctAnswers,
//     setCorrectAnswers,
//     mockArray,
//     questions,
//     answers,
//     values,
//   } = model;
//
//   // const [refArray, a] = useState([]);
//   let refArray = [];
//
//   useEffect(() => {
//     let count = 0;
//     while (count < answers[currentTask - 1].length) {
//       refArray.push(createRef());
//       count++;
//     }
//     console.log(refArray.length);
//   }, [currentTask]);
//
//   const inputRef = useRef();
//
//   function answerCheck() {
//     if (
//       answers[currentTask - 1].toLowerCase() === values.join('').toLowerCase()
//     ) {
//       setCorrectAnswers(correctAnswers + 1);
//     }
//   }
//
//   const WordWindow = ({idx}) => {
//     return (
//       <TextInput
//         value={values[idx]}
//         maxLength={1}
//         style={styles.inputWrapper}
//         ref={(r) => (refArray[idx] = r)}
//         onChangeText={(text) => changeText(text, idx)}
//         onKeyPress={({nativeEvent: {key: keyValue}}) => {
//           if (keyValue === 'Backspace' && idx >= 0) {
//             console.log(idx);
//             values.splice(idx, 1);
//             if (idx > 0) {
//               refArray[idx - 1].focus();
//             }
//           }
//         }}
//       />
//     );
//   };
//
//   function changeText(text, idx) {
//     values.map((item) => {
//       return item;
//     });
//     if (text !== '' && idx < refArray.length && values[idx] !== '') {
//       values.splice(idx, 0, text);
//       if (idx + 1 < refArray.length) {
//         refArray[idx + 1].focus();
//       }
//     }
//     if (values.length === refArray.length) {
//       answerCheck();
//       setCurrentTask(currentTask + 1);
//     }
//   }
//
//   return (
//     <View>
//       <ScreenHeader currentTitle="Написание слова" />
//       <View style={{paddingHorizontal: 32}}>
//         <CustomRegularLightText>
//           {'Прогресс ' + currentTask + ' / ' + numberOfTasks}
//         </CustomRegularLightText>
//         <View style={{alignItems: 'center', marginTop: '50%'}}>
//           <View style={styles.wordContainer}>
//             <CustomTitleWhiteText style={{fontSize: 22}}>
//               {questions[currentTask - 1]}
//             </CustomTitleWhiteText>
//             <TouchableOpacity onPress={() => setCurrentTask(currentTask + 1)}>
//               <Image
//                 style={styles.playIcon}
//                 source={require('../../../../assets/image/Play1.png')}
//               />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.paginationContainer}>
//             {questions.map((item, index) => {
//               return (
//                 <PaginationDot
//                   key={index}
//                   index={index}
//                   activeIndex={currentTask - 1}
//                 />
//               );
//             })}
//           </View>
//           <FlatList
//             style={{marginTop: '40%'}}
//             contentContainerStyle={{alignItems: 'center'}}
//             scrollEnabled={false}
//             keyExtractor={(item, index) => index}
//             numColumns={6}
//             data={refArray}
//             renderItem={(item, index) => {
//               return <WordWindow idx={index} />;
//             }}
//           />
//           {/* <View style={{flexDirection: 'row'}}>
// {
// refArray.map((item, index)=> {
// return <WordWindow key={index} idx={index} />
// })
// }
// </View> */}
//         </View>
//       </View>
//     </View>
//   );
// };
