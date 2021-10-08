import React, { FC, useEffect, useState } from 'react';
import { Text, View, Image, FlatList ,SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MENU } from '../../constants';
import {
    getJaanData,
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
        <View style={{ borderWidth: 1, padding: 10, marginTop: 20 }}>
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



const JaanScreen: FC = () => {

    const dispatch = useDispatch();
    const jaanMembers = useSelector(state => state?.SecureAccountReducer?.jaanData)
    const isLoading = useSelector(state => state?.SecureAccountReducer?.isLoading);
    const memberCount = useSelector(state => state?.SecureAccountReducer?.memberCount);
    const [jaanMode, setJaanMode] = useState('jaanPrasthanCheck');
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
                    if (jaanMode === 'jaanPrasthanCheck') {
                        if (item.val().jaanPrasthanCheck) {
                            data.push(item.val())
                            totalMember.push(parseInt(item.val()?.memberCount))
                        }
                    }
                    if (jaanMode === 'jaanVidayCheck') {
                        console.log("sdsdf", item)
                        if (item.val().jaanVidayCheck) {
                            data.push(item.val())
                            totalMember.push(parseInt(item.val().memberCount))
                        }
                    }
                });
                let memberCount = totalMember.length && totalMember.reduce((a, b) => a + b)
                dispatch(getJaanData(data, memberCount));
            });
    }

    useEffect(() => {
        onGetData()
    }, [dispatch, jaanMode, isModalVisible]);


    const JaanMode = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
                <TouchableOpacity
                    onPress={() => setJaanMode('jaanPrasthanCheck')}
                    style={{
                        padding: 10, borderWidth: jaanMode === 'jaanPrasthanCheck' ? 0 : 1,
                        backgroundColor: jaanMode === 'jaanPrasthanCheck' ? 'orange' : 'white', margin: 10, borderRadius: 8
                    }}>
                    <Text style={{ color: jaanMode === 'jaanPrasthanCheck' ? 'white' : 'black', fontSize: 20 }}>
                        {MENU.jaanPrasthan}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setJaanMode('jaanVidayCheck')}
                    style={{
                        padding: 10, borderWidth: jaanMode === 'jaanVidayCheck' ? 0 : 1,
                        backgroundColor: jaanMode === 'jaanVidayCheck' ? 'orange' : 'white', margin: 10, borderRadius: 8
                    }}>
                    <Text style={{ color: jaanMode === 'jaanVidayCheck' ? 'white' : 'black', fontSize: 20 }}>
                        {MENU.jaanViday}
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flexGrow: 1 }}>
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
                        {MENU.partyPlot}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 22, color: 'orange' }}>
                        {MENU.samay + " :  "}
                    </Text>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 3 }}>
                        {/* {memberCount} */}
                    </Text>
                </View>
            </View>

            <JaanMode />

            <HeaderView />



            {isModalVisible && <NewMember
                        isModalVisible={isModalVisible}
                        toggleModal={toggleModal}
                        selectedData={selectedData}
                    />}


            {isLoading ? <ActivityIndicator size={'large'} color={'orange'} style={{ alignSelf: 'center', flex: 1 }} /> :

                <FlatList
                    data={jaanMembers}
                    onScroll={onGetData}
                    style={{ borderWidth: 0, }}
                    initialNumToRender={15}
                    ListHeaderComponent={<IndexView />}
                    renderItem={item => <ListMember data={item} toggleModal={toggleModal} />}
                />
            }
        




        </SafeAreaView>
    )

};

export default JaanScreen;
