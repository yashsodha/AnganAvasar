import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { Text, View, Image, FlatList, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MENU } from '../../constants';
import { IMAGES } from '../../Assets';
import {
    getSanjiData,
    clearMemberDetails
} from '../../redux/actions/StockDetailsActions';
import database from '@react-native-firebase/database';
import NewMember from '../Home/NewMember';

const ListMember = ({ data, toggleModal }) => {
    return (
        <TouchableOpacity
            onPress={() => toggleModal(data)}
            style={{ borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, padding: 10, flexDirection: 'row' }}>
            <View style={{ width: '70%', borderRightWidth: 1 }}>
                <Text style={{ alignSelf: 'flex-start', fontSize: 18, fontWeight: '500', marginLeft: 10 }}>
                    {data?.item.name}
                </Text>
            </View>
            <View style={{ width: '30%' }}>
                <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: '500' }}>
                    {data?.item.memberCount}
                </Text>
            </View>
        </TouchableOpacity>

    )
}

const HeaderView = () => {
    return (
        <View style={{ borderWidth: 1, padding: 10 }}>
            <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>
                {MENU.mainMenu[0].name}
            </Text>
        </View>
    )
}


const IndexView = () => {
    return (
        <View style={{ borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, padding: 10, flexDirection: 'row' }}>

            <View style={{ width: '70%', borderRightWidth: 1 }}>
                <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: '500' }}>
                    {MENU.name}
                </Text>
            </View>
            <View style={{ width: '30%' }}>
                <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: '500' }}>
                    {MENU.member}
                </Text>
            </View>
        </View>
    )
}


const SanjiScreen: FC = () => {

    const dispatch = useDispatch();
    const sanjiMembers = useSelector(state => state?.SecureAccountReducer?.SanjiData);
    const isLoading = useSelector(state => state?.SecureAccountReducer?.isLoading);
    const memberCount = useSelector(state => state?.SecureAccountReducer?.memberCount);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedData, setSelectData] = useState();



    const toggleModal = ({ item }) => {
        setSelectData(item)
        setModalVisible(!isModalVisible);
    };


    const onGetData = () => {
        dispatch(clearMemberDetails())
        let data = [];
        let totalMember = [];
        database()
            .ref('MemberList')
            .once('value')
            .then(snapshot => {
                snapshot.forEach(item => {
                    if (item.val().sanjiCheck) {
                        data.push(item.val())
                        totalMember.push(parseInt(item.val().memberCount))
                    }
                });
                let memberCount = totalMember.length && totalMember.reduce((a, b) => a + b)
                dispatch(getSanjiData(data, memberCount));
            });
    }

    useEffect(() => {
        onGetData()
    }, [dispatch, isModalVisible]);

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flexGrow: 1 }}>
            {isLoading ? <ActivityIndicator size={'large'} color={'orange'} style={{ alignSelf: 'center', flex: 1 }} /> :
                <View>
                    <View style={{ padding: 15 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 22, color: 'orange' }}>
                                {MENU.sabhyo + ":  "}
                            </Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 6 }}>
                                {memberCount}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 22, color: 'orange' }}>
                                {MENU.sthal + "  :  "}
                            </Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 3 }}>
                                {MENU.lohanaVadi}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 22, color: 'orange' }}>
                                {MENU.samay + " : "}
                            </Text>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 3 }}>
                                {/* {memberCount} */}
                            </Text>
                        </View>
                    </View>

                    <HeaderView />

                    <FlatList
                        data={sanjiMembers}
                        onScroll={onGetData}
                        style={{ borderWidth: 0, }}
                        initialNumToRender={15}
                        ListHeaderComponent={<IndexView />}
                        renderItem={item => <ListMember data={item} toggleModal={toggleModal} />}
                    />

                </View>}
            {isModalVisible && <NewMember
                isModalVisible={isModalVisible}
                toggleModal={toggleModal}
                selectedData={selectedData}
            />}

        </SafeAreaView>
    )

};

export default SanjiScreen;
