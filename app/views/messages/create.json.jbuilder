json.(@message, :content, :image)
json.name @message.user.name
json.date @message.created_at.strftime('%Y/%m/%d %H:%M:%S')
json.id @message.id
