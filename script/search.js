"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const sidebarToggleBtn = document.querySelector(".sidebar-header");

  sidebarToggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // Lấy dữ liệu từ Local Storage
  const petArr = JSON.parse(getFromStorage("petArr")) || [];
  const breedArr = JSON.parse(getFromStorage("breedArr")) || [];

  // Lấy reference đến tbody trong bảng
  const tbody = document.getElementById("tbody");

  // Render dữ liệu vào bảng
  renderTableData(petArr, tbody);

  // Cập nhật danh sách Breed trong select
  const breedSelect = document.getElementById("input-breed");
  breedSelect.innerHTML = "<option>Select Breed</option>";
  breedArr.forEach((breed) => {
    const option = document.createElement("option");
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
});

// Hàm render dữ liệu vào bảng
function renderTableData(petArr, tbody) {
  // Xóa nội dung hiện tại của tbody
  tbody.innerHTML = "";

  // Duyệt qua từng đối tượng trong mảng petArr
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${pet.id}</th>
      <td>${pet.name}</td>
      <td>${pet.age}</td>
      <td>${pet.type}</td>
      <td>${pet.weight} kg</td>
      <td>${pet.length} cm</td>
      <td>${pet.breed}</td>
      <td>
        <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
      </td>
      <td>${
        pet.vaccinated
          ? '<i class="bi bi-check-circle-fill"></i>'
          : '<i class="bi bi-x-circle-fill"></i>'
      }</td>
      <td>${
        pet.dewormed
          ? '<i class="bi bi-check-circle-fill"></i>'
          : '<i class="bi bi-x-circle-fill"></i>'
      }</td>
      <td>${
        pet.sterilized
          ? '<i class="bi bi-check-circle-fill"></i>'
          : '<i class="bi bi-x-circle-fill"></i>'
      }</td>
      <td>${pet.dateAdded}</td>
    `;

    // Thêm hàng vào tbody
    tbody.appendChild(row);
  });
}

document.getElementById("find-btn").addEventListener("click", function () {
  // Lấy giá trị từ các input
  const id = document.getElementById("input-id").value.trim();
  const name = document.getElementById("input-name").value.trim();
  const type = document.getElementById("input-type").value.trim();
  const breed = document.getElementById("input-breed").value.trim();
  const vaccinated = document.getElementById("input-vaccinated").checked;
  const dewormed = document.getElementById("input-dewormed").checked;
  const sterilized = document.getElementById("input-sterilized").checked;

  // Lấy dữ liệu petArr từ LocalStorage
  const petArr = JSON.parse(getFromStorage("petArr")) || [];

  // Tìm kiếm dựa trên các tiêu chí được nhập
  const searchResults = petArr.filter(
    (pet) =>
      (id === "" || pet.id.includes(id)) &&
      (name === "" || pet.name.toLowerCase().includes(name.toLowerCase())) &&
      (type === "Select Type" || pet.type === type) &&
      (breed === "Select Breed" || pet.breed === breed) &&
      (!vaccinated || pet.vaccinated) &&
      (!dewormed || pet.dewormed) &&
      (!sterilized || pet.sterilized)
  );

  // Hiển thị kết quả tìm kiếm
  renderTableData(searchResults, document.getElementById("tbody"));
});
