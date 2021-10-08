import React, { FC, useEffect, useState } from 'react';
import { Text, View, FlatList, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MENU } from '../../constants';
import {
    getKankotriData,
    clearMemberDetails,
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
        <View style={{ borderWidth: 1, padding: 10, marginTop: 30 }}>
            <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>
                {MENU.Kankotari}
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


const KankotriScreen: FC = () => {

    const dispatch = useDispatch();
    const kankotriMembers = useSelector(state => state?.SecureAccountReducer?.kankotriData)
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
                    if (item.val().kankotariCheck) {
                        data.push(item.val())
                        totalMember.push(parseInt(item.val().memberCount))
                    }
                });
                let memberCount = totalMember.length && totalMember.reduce((a, b) => a + b)
                dispatch(getKankotriData(data, memberCount));
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
                    </View>

                    <HeaderView />

                    {isModalVisible && <NewMember
                        isModalVisible={isModalVisible}
                        toggleModal={toggleModal}
                        selectedData={selectedData}
                    />}
                    <FlatList
                        data={kankotriMembers}
                        onScroll={onGetData}
                        style={{ borderWidth: 0, }}
                        initialNumToRender={15}
                        ListHeaderComponent={<IndexView />}
                        renderItem={item => <ListMember data={item} toggleModal={toggleModal} />}
                    />
                </View>}

        </SafeAreaView>
    )

};

export default KankotriScreen;
