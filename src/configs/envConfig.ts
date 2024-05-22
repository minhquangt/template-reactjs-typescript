import { z } from 'zod';

const configSchema = z.object({
  VITE_BACKEND_BASE_URL: z.string()
});
// Phương thức "safeParse" được sử dụng để phân tích đối tượng nhập vào dựa trên schema đã định.
// Nếu có lỗi, phương thức này sẽ không ném ra ngoại lệ mà trả về một đối tượng chứa thông tin lỗi.
const configProject = configSchema.safeParse({
  VITE_BACKEND_BASE_URL: import.meta.env.VITE_BACKEND_BASE_URL
});
if (!configProject.success) {
  console.error(configProject.error.issues);
  throw new Error('Các giá trị khai báo trong file .env không hợp lệ');
}

const envConfig = configProject.data;
export default envConfig;
