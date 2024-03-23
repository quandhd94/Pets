"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const sidebarToggleBtn = document.querySelector(".sidebar-header");

  sidebarToggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });
});
// Đầu tiên, tạo một mảng breedArr để lưu trữ dữ liệu Breed
let breedArr = [];

// Khi trang được tải, lấy dữ liệu Breed từ LocalStorage và hiển thị trong bảng
document.addEventListener("DOMContentLoaded", function () {
  // Lấy dữ liệu Breed từ LocalStorage nếu có
  const storedBreed = JSON.parse(getFromStorage("breedArr")) || [];
  breedArr = storedBreed;

  // Hiển thị dữ liệu Breed trong bảng
  renderBreedTable(breedArr);
});

// Hàm renderBreedTable để hiển thị dữ liệu Breed trong bảng
function renderBreedTable(breeds) {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = ""; // Xóa nội dung cũ của tbody trước khi render lại

  // Duyệt qua mảng breeds và tạo các hàng của bảng để hiển thị dữ liệu
  breeds.forEach((breed, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${breed.name}</td>
                <td>${breed.type}</td>
                <td>
                    <button type="button" class="btn btn-danger" onclick="deleteBreed(${index})">Delete</button>
                </td>
            </tr>
        `;
    tbody.appendChild(row);
  });
}

// Bổ sung sự kiện click cho nút "Submit"
const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", function () {
  // Lấy giá trị từ các input
  const nameInput = document.getElementById("input-breed").value.trim();
  const typeInput = document.getElementById("input-type").value.trim();

  // Validate dữ liệu
  if (nameInput === "" || typeInput === "Select Type") {
    alert("Please fill in all fields!");
    return; // Không thực hiện thêm nếu dữ liệu không hợp lệ
  }

  // Tạo object chứa dữ liệu Breed
  const newBreed = {
    name: nameInput,
    type: typeInput,
  };

  // Thêm Breed vào mảng breedArr
  breedArr.push(newBreed);

  // Cập nhật mảng breedArr vào LocalStorage
  saveToStorage("breedArr", JSON.stringify(breedArr));

  // Gọi lại hàm renderBreedTable để hiển thị lại danh sách Breed
  renderBreedTable(breedArr);

  // Reset các trường input sau khi thêm Breed thành công
  document.getElementById("input-breed").value = "";
  document.getElementById("input-type").value = "Select Type";
});

// Hàm xóa Breed
function deleteBreed(index) {
  // Xác nhận xóa trước khi thực hiện
  if (confirm("Are you sure you want to delete this breed?")) {
    // Xóa Breed khỏi mảng breedArr
    breedArr.splice(index, 1);

    // Cập nhật mảng breedArr vào LocalStorage
    saveToStorage("breedArr", JSON.stringify(breedArr));

    // Gọi lại hàm renderBreedTable để hiển thị lại danh sách Breed sau khi xóa
    renderBreedTable(breedArr);
  }
}
