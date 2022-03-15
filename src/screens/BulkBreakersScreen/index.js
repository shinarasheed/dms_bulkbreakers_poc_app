import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, View, Pressable, FlatList } from "react-native";
import { ScrollView } from "react-native-virtualized-view";

import appTheme from "../../constants/theme";
import { Bulkbreaker } from "../../components/bulkbreakers/BulkBreaker";
import BottomFilter from "../../components/home/BottomFilter";
import { getBulkbreakers } from "../../redux/actions/customerActions";

const BulkBreakersScreen = () => {
  const [visible, setVisible] = useState(false);

  const customerState = useSelector((state) => state.customer);

  const { distributors: bulkbreakers } = customerState;

  function toggle() {
    setVisible((visible) => !visible);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBulkbreakers());
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 30,
          marginTop: 50,
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
          data={bulkbreakers}
          listKey={(item) => item.id.toString()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Bulkbreaker bulkbreaker={item} />}
        />
      </View>

      <BottomFilter visible={visible} toggle={toggle} />
    </ScrollView>
  );
};

export default BulkBreakersScreen;
