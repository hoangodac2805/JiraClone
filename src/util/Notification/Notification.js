import { Button, notification, Space } from "antd";

export const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  });
};
