import { Popconfirm, Spin } from "antd";
import React from "react";

function Delete({onDelete, deleting}) {
    if (deleting) {
        return <Spin size="small" />
    }
    return <Popconfirm
        title="Are you sure to delete this?"
        onConfirm={onDelete}
        okText="Yes"
        cancelText="No">
        <a>Delete</a>
    </Popconfirm>
}

export default Delete;