# 💰 Hệ Thống Quản Lý Tài Chính Cá Nhân

## 🧩 Giới thiệu
Dự án **Quản lý tài chính cá nhân** giúp người dùng theo dõi thu nhập, chi tiêu, lập ngân sách, quản lý nhắc nhở hóa đơn và phân tích tài chính một cách hiệu quả.  
Hệ thống được xây dựng theo kiến trúc **microservices**, giúp dễ dàng mở rộng, bảo trì và tích hợp thêm các tính năng trong tương lai.

---

## ⚙️ Công nghệ sử dụng

| Thành phần        | Công nghệ chính            |
|-------------------|-----------------------------|
| **Frontend**      | ReactJS                     |
| **Backend**       | Node.js (Express)           |
| **Cơ sở dữ liệu** | MongoDB                     |
| **CI/CD**         | GitHub Actions + ArgoCD     |
| **Triển khai**    | K3s (Lightweight Kubernetes)|
| **Khác**          | Docker, REST API            |

---

## 🏗️ Kiến trúc hệ thống

### 🔹 Frontend
- Viết bằng **ReactJS**
- Kết nối với backend qua **REST API**

### 🔹 Backend (Microservices)
- `auth-service`: Xử lý xác thực và quản lý người dùng (JWT, đăng ký, đăng nhập)
- `budget-service`: Quản lý ngân sách hàng tháng, phân loại chi tiêu
- `transactions-service`: Ghi nhận các giao dịch thu/chi

### 🔹 Triển khai
- Mỗi service được container hóa bằng Docker
- Deploy tự động thông qua **GitHub Actions** và **ArgoCD**
- Chạy trên cụm **K3s** (local hoặc on-premise)

---

## 🗂️ Cấu trúc thư mục

