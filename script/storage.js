"use strict";
// Hàm lưu dữ liệu vào LocalStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

// Hàm lấy dữ liệu từ LocalStorage
function getFromStorage(key, defaultVal) {
  // Sử dụng toán tử nullish coalescing (??) để trả về defaultVal nếu dữ liệu không tồn tại trong LocalStorage
  return localStorage.getItem(key) ?? defaultVal;
}
