export interface CreateNotificationEvent{
  type:"CREATE_NOTIFICATION",
  notificationId:string,
  message:string
}

export interface NotificationSentEvent{
  type:"NOTIFICATION_SENT",
  notificationId:string,
  message:string
}