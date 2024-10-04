import { useTheme } from "@react-navigation/native";
import { ChevronRight } from "lucide-react-native";
import React, { useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Button, Alert } from "react-native";
import type { Screen } from "@/router/helpers/types";
import { NativeItem, NativeList, NativeListHeader, NativeText } from "@/components/Global/NativeComponents";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DevMenu: Screen<"DevMenu"> = ({ navigation }) => {
  const theme = useTheme();
  const { colors } = theme;

  // add button to header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AccountSelector");
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 0,
          }}
        >
          <Text
            style={{
              color: colors.primary,
              fontFamily: "medium",
              fontSize: 17.5,
            }}
          >
            Appli
          </Text>

          <ChevronRight
            size={32}
            color={colors.primary}
            style={{ marginLeft: 0, marginRight: -8 }}
          />
        </TouchableOpacity>
      ),
      headerLargeTitle: true,
    });
  }, [navigation]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        padding: 16,
      }}
    >
      <View
        style={{
          backgroundColor: colors.text + "16",
          borderRadius: 10,
          borderCurve: "continuous",
          padding: 16,
          gap: 4,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 18,
            fontFamily: "bold",
          }}
        >
          Menu pour les développeurs
        </Text>


        <Text
          style={{
            color: colors.text,
            fontSize: 16,
            lineHeight: 20,
            fontFamily: "medium",
            opacity: 0.7,
          }}
        >
          Intégrez vos options et paramètres de développement ici.
        </Text>
      </View>

      {__DEV__ && (
        <View>
          <NativeListHeader label="Options de développement" />

          <NativeList>

            <NativeItem
              onPress={() => navigation.navigate("AccountSelector")}
            >
              <NativeText>
                Go to Account Selector
              </NativeText>
            </NativeItem>

            <NativeItem
              onPress={() => navigation.navigate("NoteReaction")}
            >
              <NativeText>
                NoteReaction
              </NativeText>
            </NativeItem>

            <NativeItem
              onPress={() => navigation.navigate("ColorSelector")}
            >
              <NativeText>
                ColorSelector
              </NativeText>
            </NativeItem>

            <NativeItem
              onPress={() => navigation.navigate("AccountCreated")}
            >
              <NativeText>
                AccountCreated
              </NativeText>
            </NativeItem>

          </NativeList>
        </View>
      )}

      <View>
        <NativeListHeader label="Options de développement" />

        <NativeList>

          <NativeItem
            onPress={() => {
              Alert.alert(
                "Reset all data",
                "Are you sure you want to reset all data?",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Reset",
                    style: "destructive",
                    onPress: () => {
                      AsyncStorage.clear();
                      navigation.popToTop();
                    },
                  },
                ],
              );
            }}
          >
            <NativeText
              style={{
                color: "#E91E63",
                fontFamily: "semibold",
              }}
            >
              Erase all Papillon data and settings
            </NativeText>
          </NativeItem>
        </NativeList>
      </View>

    </ScrollView>
  );
};

export default DevMenu;