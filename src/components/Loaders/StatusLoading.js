import React from "react";
import { Placeholder, PlaceholderMedia, Fade } from "rn-placeholder";

export const StatusLoading = () => {
  return (
    <Placeholder Animation={Fade}>
      <PlaceholderMedia
        style={{
          paddingHorizontal: 10,
          paddingTop: 10,
        }}
      />
    </Placeholder>
  );
};
