import React from "react";
import { useFetchPostByIdQuery } from "../../store";

export function PostViewItem(props) {
  const { data, isFetching } = useFetchPostByIdQuery();
  if (isFetching) {
    <div>loading...</div>;
  } else {
    console.log(props.data);
    return <div>PostViewItem</div>;
  }
}

export default PostViewItem;
