# Xem nhật ký logs hoạt động của container
docker compose logs -f

# Tạm dừng container
docker compose stop

# Khởi động lại container
docker compose start

# Tắt và xóa container
docker compose down

# Build lại sau khi chỉnh sửa mã nguồn
docker compose up -d --build
