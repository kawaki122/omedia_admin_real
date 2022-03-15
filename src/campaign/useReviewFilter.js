import { Input } from "antd";
import moment from "moment";
import { useMemo } from "react";
import { urlHelper } from "../utils/UrlHelper";

const useReviewFilter = (location, reviews, extra) => {
  return useMemo(() => {
    if (location) {
      return reviews
        .filter((item) => item.location === location._id)
        .map((item) => ({
          ...item,
          avatar: urlHelper.fileUrl(item.avatar),
          datetime: moment(item.createdAt).fromNow(),
          content: extra.config.edit ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {item.author === "Omedia" ? (
                <Input
                  value={item.content}
                  onChange={(event) =>
                    extra.changeReviews({ value: event.target.value, _id: item._id })
                  }
                  allowClear
                />
              ) : (
                item.content
              )}
            </div>
          ) : (
            item.content
          ),
        }));
    }
    return [];
  }, [location, reviews, extra.config.edit, extra.changeReviews]);
};

export default useReviewFilter;
