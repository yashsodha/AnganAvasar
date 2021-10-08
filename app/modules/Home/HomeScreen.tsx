import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { MENU } from '../../constants';
import { IMAGES } from '../../Assets';
import {
  FloatingButton,
} from "react-native-action-floating-button";
import NewMember from '../Home/NewMember';




const ListStock = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate(item?.page)}
        style={{ marginVertical: 18, marginHorizontal: 11, alignSelf: 'center', borderWidth: 1 }}>
        <Image source={IMAGES[`${item?.image}`]}
          resizeMode={'stretch'}
          style={{ height: 80, width: 80, margin: 10 }}
        />
        <Text style={{ fontSize: 20, textAlign: 'center',paddingBottom:5 , color:'black'}}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const Pransang = ({ }) => {
  return (
    <View style={{ borderTopWidth: 2, borderBottomWidth: 2, padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', color:'black' }}>
        {MENU.Prasang}
      </Text>
    </View>
  )
}

const Kankotari = ({ }) => {
  const navigation = useNavigation();
  return (
    <View style={{ borderTopWidth: 2, borderBottomWidth: 2 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Kankotri')}
        style={{ margin: 15, alignSelf: 'center', borderWidth: 0 }}>
        <Image source={IMAGES.kankotari}
          resizeMode={'stretch'}
          style={{ height: 100, width: 180 }}
        />
        <Text style={{ fontSize: 20, textAlign: 'center', color:'black' }}>
          {MENU.Kankotari}
        </Text>
      </TouchableOpacity>
    </View>
  )
}


const HomeScreen: FC = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    // getStockSymboles(dispatch,"exchange","BO");
  }, [dispatch]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flexGrow: 1 }}>
      <View style={{ backgroundColor: 'white' }}>
        <Text style={{ textAlign: 'center', color: 'orange', fontSize: 25, marginBottom: 40, fontWeight: 'bold' }}>
          WELCOME TO SODHA FAMILY
        </Text>
        <Pransang />
        <FlatList
          data={MENU.mainMenu}
          style={{ borderWidth: 0, alignSelf: 'center' }}
          horizontal
          renderItem={item => <ListStock {...item} />}
        />
        <Kankotari />
      </View>
      <FloatingButton
        hasChildren={false}
        icon={<Text style={{ fontSize: 35, textAlign: 'center', justifyContent: 'center', color: 'white' }}>+</Text>}
        background="Orange"
        onPress={toggleModal}
      />

      {isModalVisible && <NewMember isModalVisible={isModalVisible} toggleModal={toggleModal} />}

    </SafeAreaView>
  );
};

export default HomeScreen;
