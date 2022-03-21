import { Input } from "antd";
import moment from "moment";
import { useMemo } from "react";
import { urlHelper } from "../utils/UrlHelper";
import { CloseCircleFilled, UndoOutlined } from "@ant-design/icons";

const useReviewFilter = (location, reviews, revb, extra) => {
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
                    extra.changeReviews({
                      value: event.target.value,
                      _id: item._id,
                    })
                  }
                  suffix={
                    item.content ? (
                      <CloseCircleFilled
                        onClick={() =>
                          extra.changeReviews({ value: "", _id: item._id })
                        }
                        color="rgba(0, 0, 0, 0.25)"
                      />
                    ) : (
                      <UndoOutlined
                        onClick={() =>
                          extra.changeReviews({ value: "undo", _id: item._id })
                        }
                        color="rgba(0, 0, 0, 0.25)"
                      />
                    )
                  }
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
  }, [location, reviews, extra.config.edit, revb, extra.changeReviews]);
};

export default useReviewFilter;
