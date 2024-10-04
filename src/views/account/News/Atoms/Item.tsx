import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  View,
} from "react-native";
import {
  NativeItem,
  NativeText,
} from "@/components/Global/NativeComponents";
import parse_news_resume from "@/utils/format/format_pronote_news";
import parse_initials from "@/utils/format/format_pronote_initials";
import formatDate from "@/utils/format/format_date_complets";
import InitialIndicator from "@/components/News/InitialIndicator";

const NewsListItem = ({ index, message, navigation, parentMessages }) => {
  const theme = useTheme();

  return (
    <NativeItem
      onPress={() => {
        navigation.navigate("NewsItem", {
          message: JSON.stringify(message),
          important: message.important !== undefined,
        });
      }}
      chevron={false}
      leading={
        <InitialIndicator
          initial={parse_initials(message.author)}
          color={theme.colors.primary}
        />
      }
      separator={index !== parentMessages.length - 1}
    >
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <NativeText
          numberOfLines={1}
          variant="subtitle"
        >
          {message.author}
        </NativeText>

        {!message.read && (
          <View style={{
            width: 8,
            height: 8,
            borderRadius: 5,
            backgroundColor: theme.colors.primary,
          }} />
        )}
      </View>
      <NativeText
        numberOfLines={1}
        variant="title"
      >
        {message.title}
      </NativeText>
      <NativeText
        numberOfLines={2}
        variant="default"
        style={{
          lineHeight: 20,
          opacity: 0.8,
        }}
      >
        {parse_news_resume(message.content)}
      </NativeText>
      <NativeText
        numberOfLines={1}
        variant="subtitle"
        style={{
          marginTop: 6,
        }}
      >
        {formatDate(message.date)}
      </NativeText>
    </NativeItem>
  );
};

export default NewsListItem;