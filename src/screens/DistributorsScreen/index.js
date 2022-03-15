import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import { ScrollView } from "react-native-virtualized-view";

import appTheme from "../../constants/theme";
import { Distributor } from "../../components/distributors/Distributor";
import BottomFilter from "../../components/home/BottomFilter";
import { getDistributors } from "../../redux/actions/customerActions";

const Distributors = () => {
  const [visible, setVisible] = useState(false);

  const customerState = useSelector((state) => state.customer);

  const { distributors } = customerState;

  function toggle() {
    setVisible((visible) => !visible);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDistributors());
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 30,
          marginTop: 40,
        }}
      >
        <Pressable
          onPress={() => toggle()}
          style={{
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              color: appTheme.COLORS.mainRed,
              fontSize: 13,
              fontFamily: "Gilroy-Bold",
            }}
          >
            SORT BY
          </Text>
        </Pressable>

        <FlatList
          showsHorizontalScrollIndicator={false}
          data={distributors}
          listKey={(item) => item.id.toString()}
          keyExtractor={(distributor) => distributor.id.toString()}
          renderItem={({ item }) => <Distributor distributor={item} />}
        />
      </View>

      <BottomFilter visible={visible} toggle={toggle} />
    </ScrollView>
  );
};

export default Distributors;
