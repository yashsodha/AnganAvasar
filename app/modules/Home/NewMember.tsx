import React, { FC, useState } from 'react';
import { Text, View, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import { MENU } from '../../constants'
import { Isao } from 'react-native-textinput-effects';
import CheckBox from '@react-native-community/checkbox';
import database from '@react-native-firebase/database';


const NewMember: FC = ({ isModalVisible, toggleModal, selectedData }) => {

  const [sanjiCheck, sanjiCheckBok] = useState(selectedData?.sanjiCheck || false)
  const [janoiCheck, janoiCheckBox] = useState(selectedData?.janoiCheck || false)
  const [jaanPrasthanCheck, jaanPrasthanCheckBox] = useState(selectedData?.jaanPrasthanCheck || false)
  const [jaanVidayCheck, jaanVidayCheckBox] = useState(selectedData?.jaanVidayCheck || false)
  const [kankotariCheck, kankotariCheckBox] = useState(selectedData?.kankotariCheck || false)
  const [memberName, onSetMemberName] = useState(selectedData?.name || '')
  const [memberCount, onSetMemberCount] = useState(selectedData?.memberCount || '')
  const [isLoadingEntry, setLoadingEntry] = useState(false)

  const onRemoveMember = () => {

    setLoadingEntry(true)
    let itemKey = ''
    database()
      .ref('MemberList')
      .once('value')
      .then(snapshot => {
        snapshot.forEach(item => {
          if (item.val().name === selectedData.name) {
            itemKey = item?.key
          }
        });
        database().ref(`MemberList/${itemKey}`).remove();
        setLoadingEntry(false)
        toggleModal(false)
      })
  }

  const onAddMember = () => {
    if (!sanjiCheck && !janoiCheck && !jaanPrasthanCheck && !jaanVidayCheck && !kankotariCheck && memberName.length === 0 && memberCount.length === 0) {
      Alert.alert("Please enter member details")
    }
    else if (memberName.length === 0 || memberCount.length === 0 || !sanjiCheck && !janoiCheck && !jaanPrasthanCheck && !jaanVidayCheck && !kankotariCheck) {
      Alert.alert("Please enter member details")
    }

    else {
      setLoadingEntry(true)
      var myData =
      {
        'name': memberName,
        'memberCount': memberCount,
        'sanjiCheck': sanjiCheck,
        'janoiCheck': janoiCheck,
        'jaanPrasthanCheck': jaanPrasthanCheck,
        'jaanVidayCheck': jaanVidayCheck,
        'kankotariCheck': kankotariCheck
      }
      if (selectedData?.name === undefined) {
        database().ref('MemberList/').push(myData).then((data) => {
          setLoadingEntry(false)
          toggleModal(false)
        }).catch((error) => {
          { Alert.alert("Something Went Wrong") }
        })
      }
      else {
        let itemKey = ''
        database()
          .ref('MemberList')
          .once('value')
          .then(snapshot => {
            snapshot.forEach(item => {
              if (item.val().name === selectedData.name) {
                itemKey = item?.key
              }
            });
            database().ref(`MemberList/${itemKey}`).set(myData);
            toggleModal(false)
          })
      }
    }
  }
  return (
    <Modal isVisible={isModalVisible}>
      <View style={{ justifyContent: 'center', backgroundColor: 'white' }}>
        {isLoadingEntry ? <ActivityIndicator style={{ flex: 1, backgroundColor: 'white' }} /> :
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', paddingVertical: 10 }}>
              <Text style={{ textAlign: 'left', flex: 0.3, fontSize: 15, color: 'gray', fontWeight: 'bold' }}
                onPress={() => toggleModal(false)}>
                Cancel
              </Text>
              <Text style={{ textAlign: 'center', flex: 0.3, fontSize: 15, fontWeight: 'bold', color:'black' }}>
                New Member
              </Text>
              <Text style={{ textAlign: 'right', flex: 0.3, fontSize: 15, fontWeight: 'bold', color: 'orange' }}
                onPress={() => onAddMember()} >
                {selectedData?.name === undefined ? "Add" : "update"}
              </Text>
            </View>
            <View style={{ margin: 15 }}>
              <Isao
                label={'Name'}
                activeColor={'#FFA500'}
                borderHeight={2}
                inputPadding={10}
                labelHeight={25}
                passiveColor={'#dadada'}
                value={memberName}
                onChangeText={name => onSetMemberName(name)}
              />
              <Isao
                label={'Number of Person'}
                activeColor={'#FFA500'}
                borderHeight={2}
                inputPadding={16}
                labelHeight={25}
                passiveColor={'#dadada'}
                value={memberCount}
                keyboardType={'number-pad'}
                onChangeText={count => onSetMemberCount(count)}
              />

              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ marginTop: 30, marginHorizontal: 20, justifyContent: 'center' }}>
                  <CheckBox
                    disabled={false}
                    value={sanjiCheck}
                    onValueChange={(newValue) => sanjiCheckBok(newValue)}
                    lineWidth={1}
                    tintColor={'gray'}
                    onCheckColor={'black'}
                    onTintColor={'orange'}

                  />
                  <Text style={{ color: 'black', fontWeight: '400', marginTop: 10, textAlign: 'center' }}>
                    {MENU.mainMenu[0].name}
                  </Text>
                </View>


                <View style={{ marginTop: 30, marginHorizontal: 20, justifyContent: 'center' }}>
                  <CheckBox
                    disabled={false}
                    value={janoiCheck}
                    onValueChange={(newValue) => janoiCheckBox(newValue)}
                    lineWidth={1}
                    tintColor={'gray'}
                    onCheckColor={'black'}
                    onTintColor={'orange'}


                  />
                  <Text style={{ color: 'black', fontWeight: '400', marginTop: 10, textAlign: 'center' }}>
                    {MENU.mainMenu[1].name}
                  </Text>
                </View>

                <View style={{ marginTop: 30, marginHorizontal: 20, justifyContent: 'center' }}>
                  <CheckBox
                    disabled={false}
                    value={kankotariCheck}
                    onValueChange={(newValue) => kankotariCheckBox(newValue)}
                    lineWidth={1}
                    tintColor={'gray'}
                    onCheckColor={'black'}
                    onTintColor={'orange'}

                  />
                  <Text style={{ color: 'black', fontWeight: '400', marginTop: 10, textAlign: 'center' }}>
                    {MENU.Kankotari}
                  </Text>
                </View>

              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ marginTop: 30, marginHorizontal: 11, justifyContent: 'center' }}>
                  <CheckBox
                    disabled={false}
                    value={jaanPrasthanCheck}
                    onValueChange={(newValue) => jaanPrasthanCheckBox(newValue)}
                    lineWidth={1}
                    tintColor={'gray'}
                    onCheckColor={'black'}
                    alignSelf={'center'}
                    onTintColor={'orange'}
                  />
                  <Text style={{ color: 'black', fontWeight: '400', marginTop: 10, textAlign: 'center' }}>
                    {MENU.jaanPrasthan}
                  </Text>
                </View>

                <View style={{ marginTop: 30, marginHorizontal: 11, justifyContent: 'center' }}>
                  <CheckBox
                    disabled={false}
                    value={jaanVidayCheck}
                    onValueChange={(newValue) => jaanVidayCheckBox(newValue)}
                    lineWidth={1}
                    tintColor={'gray'}
                    onCheckColor={'black'}
                    onTintColor={'orange'}
                    alignSelf={'center'}

                  />
                  <Text style={{ color: 'black', fontWeight: '400', marginTop: 10, textAlign: 'center' }}>
                    {MENU.jaanViday}
                  </Text>
                </View>
              </View>
             {selectedData?.name !== undefined  &&<TouchableOpacity
                onPress={onRemoveMember}
                style={{ alignSelf: 'center', margin: 25, borderWidth: 1, borderColor: 'white', padding: 15, backgroundColor: 'orange', borderRadius: 10 }}>
                <Text style={{ color: 'white', fontSize: 15, fontWeight: '500' }}>
                  Remove Invite
                </Text>
              </TouchableOpacity>}

            </View>

          </View>}
      </View>
    </Modal >

  );
};

export default NewMember;
