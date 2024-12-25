// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
// } from 'react-native';
// import { useSelector } from 'react-redux';

// const Dropdown = ({ selectedValue, onValueChange, options, isDarkMode }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const styles = useStyles();

//   const handleSelect = (value) => {
//     onValueChange(value);
//     setIsOpen(false);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.selectedValue}>
//         <Text style={styles.selectedText}>{selectedValue}</Text>
//       </TouchableOpacity>
//       {isOpen && (
//         <FlatList
//           data={options}
//           keyExtractor={(item) => item}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               onPress={() => handleSelect(item)}
//               style={styles.option}
//             >
//               <Text style={styles.optionText}>{item}</Text>
//             </TouchableOpacity>
//           )}
//           style={styles.dropdownList}
//         />
//       )}
//     </View>
//   );
// };

// const useStyles = () => {
//   const { colors } = useSelector((state) => state.theme);
//   return StyleSheet.create({
//     container: {
//       flex: 1,
//       position: 'relative',
//     },
//     selectedValue: {
//       borderWidth: 1,
//       borderColor: colors.borderColor,
//       padding: 10,
//       borderRadius: 8,
//       backgroundColor: colors.background,
//     },
//     selectedText: {
//       fontSize: 16,
//       color: colors.text,
//     },
//     dropdownList: {
//       position: 'absolute',
//       top: 50,
//       left: 0,
//       right: 0,
//       backgroundColor: colors.checkbox,
//       borderRadius: 8,
//       borderWidth: 1,
//       borderColor: colors.borderColor,
//       zIndex: 1000,
//     },
//     option: {
//       padding: 10,
//     },
//     optionText: {
//       fontSize: 16,
//       color: colors.text,
//     },
//   });
// };

// export default Dropdown;


import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';

const CustomDropDown = ({ value, items, onChange }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleItemPress = (item) => {
    onChange(item.value);
    setModalVisible(false);
  };

  return (
    <View>
      {/* Вибраний елемент */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownButtonText}>
          {value || 'Select an option'}
        </Text>
      </TouchableOpacity>

      {/* Модальне вікно для вибору елементів */}
      <Modal
        transparent
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        />
        <View style={styles.modalContent}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleItemPress(item)}
              >
                <Text style={styles.dropdownItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({
  dropdownButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 16,
    maxHeight: '60%',
  },
  dropdownItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
});
