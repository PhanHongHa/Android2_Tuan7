import { Button, TextInput } from "@react-native-material/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    View,
} from "react-native";
import Item from "./components/Item";
import List from "./components/List";

export default function App() {
  const [value, setValue] = useState("");
    const [data, setData] = useState([]);
    // const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        axios
            .get("https://634fa0c3df22c2af7b556fd3.mockapi.io/PHH")
            .then(function (response) {
                setData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {});
    }, []);

    const handleAddItem = () => {
        axios
            .post(`https://634fa0c3df22c2af7b556fd3.mockapi.io/PHH`, {
                name: value,
                image: "image 99",
                price: 66,
            })
            .then(function (response) {
                console.log(response.data);
                setData([...data, response.data]);
                // ToastAndroid.show("Đã thêm");
            })
            .catch(function (error) {
                console.log(error);
                // ToastAndroid.show("Không thế thêm");
            })
            .finally(function () {});
    };

    const handleRemoveItem = (id) => {
        setData(data.filter((item) => item.id !== id));
        axios
            .delete(
                `https://634fa0c3df22c2af7b556fd3.mockapi.io/PHH/${id}`
            )
            .then(function (response) {
                console.log(response.data);
                setData([...data.filter((item) => item.id !== id)]);
                // ToastAndroid.show("Đã thêm");
            })
            .catch(function (error) {
                console.log(error);
                // ToastAndroid.show("Không thế thêm");
            })
            .finally(function () {});
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.add}>
                <TextInput
                    variant="outlined"
                    label="Nhap mon hoc"
                    style={{ flex: 1 }}
                    value={value}
                    onChangeText={(text) => setValue(text)}
                />
                <Button title="them" onPress={handleAddItem} />
            </View>
            <View>
                <ScrollView>
                    {/* <FlatList
                        data={data}
                        renderItem={Item}
                        keyExtractor={(item) => item.id}
                    ></FlatList> */}
                    {data.map((item, index) => (
                        <Item
                            handleRemoveItem={handleRemoveItem}
                            key={index}
                            item={item}
                        ></Item>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    add: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

