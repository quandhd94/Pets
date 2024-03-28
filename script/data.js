"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const sidebarToggleBtn = document.querySelector(".sidebar-header");

  sidebarToggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });
});
// Export dữ liệu
document.getElementById("export-btn").addEventListener("click", function () {
  // Lấy dữ liệu petArr và breedArr từ LocalStorage
  const petArr = JSON.parse(getFromStorage("petArr")) || [];
  const breedArr = JSON.parse(getFromStorage("breedArr")) || [];

  // Tạo một object chứa dữ liệu của các thú cưng và breed
  const data = {
    pets: petArr,
    breeds: breedArr,
  };

  // Chuyển đổi dữ liệu thành JSON với định dạng đẹp
  const jsonData = JSON.stringify(data, null, 2);

  // Tạo một Blob từ dữ liệu JSON
  const blob = new Blob([jsonData], { type: "application/json" });

  // Tải xuống tệp JSON
  saveAs(blob, "pet_data.json");
});

// Import dữ liệu
document.getElementById("import-btn").addEventListener("click", function () {
  // Lấy tệp đã chọn từ input file
  const fileInput = document.getElementById("input-file");
  const file = fileInput.files[0];

  if (!file) {
    alert("Vui lòng chọn một file để import.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      // Đọc dữ liệu từ file và chuyển đổi thành object JavaScript
      const importedData = JSON.parse(e.target.result);

      // Kiểm tra cấu trúc của object
      if (
        !importedData.hasOwnProperty("pets") ||
        !importedData.hasOwnProperty("breeds")
      ) {
        alert(
          "File JSON không hợp lệ. Vui lòng chọn một file có cấu trúc tương tự như file JSON khi Export."
        );
        return;
      }

      // Lưu trữ dữ liệu thú cưng từ file JSON vào local storage
      const petArr = importedData.pets;
      const breedArr = importedData.breeds;
      saveToStorage("petArr", JSON.stringify(petArr));
      saveToStorage("breedArr", JSON.stringify(breedArr));

      // Thông báo import thành công
      alert("Dữ liệu đã được import thành công.");

      // Tải lại trang để hiển thị dữ liệu mới
      location.reload();
    } catch (error) {
      alert("Đã xảy ra lỗi khi import dữ liệu: " + error);
    }
  };

  reader.readAsText(file);
});
