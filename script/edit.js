"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const sidebarToggleBtn = document.querySelector(".sidebar-header");

  sidebarToggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });
});
// Khai báo biến
const tbody = document.getElementById("tbody");

// Sự kiện DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  // Lấy dữ liệu từ Local Storage
  const petArr = JSON.parse(getFromStorage("petArr")) || [];

  // Render dữ liệu vào bảng
  renderTableData(petArr, tbody);
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
      <td>
        <button type="button" class="btn btn-primary" onclick="showEditForm('${
          pet.id
        }')">Edit</button>
      </td>
    `;

    // Thêm hàng vào tbody
    tbody.appendChild(row);
  });
}

// Hàm hiển thị form chỉnh sửa thú cưng
function showEditForm(petId) {
  // Lấy thú cưng từ Local Storage theo id
  const petArr = JSON.parse(getFromStorage("petArr")) || [];
  const pet = petArr.find((pet) => pet.id === petId);

  // Hiển thị form chỉnh sửa
  document.getElementById("container-form").classList.remove("hide");

  // Điền thông tin của thú cưng vào form
  document.getElementById("input-id").value = pet.id;
  document.getElementById("input-name").value = pet.name;
  document.getElementById("input-age").value = pet.age;
  document.getElementById("input-type").value = pet.type;
  document.getElementById("input-weight").value = pet.weight;
  document.getElementById("input-length").value = pet.length;
  document.getElementById("input-color-1").value = pet.color;
  document.getElementById("input-breed").value = pet.breed;
  document.getElementById("input-vaccinated").checked = pet.vaccinated;
  document.getElementById("input-dewormed").checked = pet.dewormed;
  document.getElementById("input-sterilized").checked = pet.sterilized;

  // Lấy danh sách các Breed tương ứng với Type
  const breedOptions = getBreedOptions(pet.type);

  // Cập nhật danh sách Breed trong select
  const breedSelect = document.getElementById("input-breed");
  breedSelect.innerHTML = "";
  breedOptions.forEach((breed) => {
    const option = document.createElement("option");
    option.textContent = breed;
    breedSelect.appendChild(option);
  });
}

// Hàm lấy danh sách các Breed tương ứng với Type
function getBreedOptions(type) {
  // Lấy dữ liệu Breed từ LocalStorage
  const breedArr = JSON.parse(getFromStorage("breedArr")) || [];

  // Lọc danh sách Breed tương ứng với Type
  const breedOptions = breedArr
    .filter((breed) => breed.type === type)
    .map((breed) => breed.name);

  return breedOptions;
}

// Sự kiện change khi người dùng thay đổi Type
document.getElementById("input-type").addEventListener("change", function () {
  // Lấy giá trị Type được chọn
  const selectedType = this.value;

  // Lấy danh sách Breed tương ứng với Type
  const breedOptions = getBreedOptions(selectedType);
  // Cập nhật danh sách Breed trong select
  const breedSelect = document.getElementById("input-breed");
  breedSelect.innerHTML = "";
  breedOptions.forEach((breed) => {
    const option = document.createElement("option");
    option.textContent = breed;
    breedSelect.appendChild(option);
  });
});

// Sự kiện click vào nút "Submit"
document.getElementById("submit-btn").addEventListener("click", function () {
  // Lấy giá trị từ các input
  const id = document.getElementById("input-id").value.trim();
  const name = document.getElementById("input-name").value.trim();
  const age = document.getElementById("input-age").value.trim();
  const type = document.getElementById("input-type").value.trim();
  const weight = document.getElementById("input-weight").value.trim();
  const length = document.getElementById("input-length").value.trim();
  const color = document.getElementById("input-color-1").value.trim();
  const breed = document.getElementById("input-breed").value.trim();
  const vaccinated = document.getElementById("input-vaccinated").checked;
  const dewormed = document.getElementById("input-dewormed").checked;
  const sterilized = document.getElementById("input-sterilized").checked;
  const dateAdded = new Date().toLocaleDateString(); // Lấy ngày hiện tại

  // Tạo object chứa thông tin thú cưng
  const pet = {
    id,
    name,
    age,
    type,
    weight,
    length,
    color,
    breed,
    vaccinated,
    dewormed,
    sterilized,
    dateAdded,
  };

  // Lấy dữ liệu petArr từ LocalStorage
  let petArr = JSON.parse(getFromStorage("petArr")) || [];
  // Kiểm tra xem dữ liệu có hợp lệ không
  if (!validateData(pet, petArr)) {
    return; // Dừng nếu dữ liệu không hợp lệ
  }
  // Kiểm tra xem có phải thêm mới hay cập nhật thông tin thú cưng
  const existingPetIndex = petArr.findIndex((p) => p.id === id);
  if (existingPetIndex !== -1) {
    // Cập nhật thông tin thú cưng nếu đã tồn tại
    petArr[existingPetIndex] = pet;
  } else {
    // Thêm thú cưng mới vào mảng petArr
    petArr.push(pet);
  }

  // Lưu mảng petArr mới vào LocalStorage
  saveToStorage("petArr", JSON.stringify(petArr));

  // Render lại dữ liệu trên bảng
  renderTableData(petArr, document.getElementById("tbody"));

  // Reset các trường input sau khi thêm/cập nhật thành công
  document.getElementById("input-id").value = "";
  document.getElementById("input-name").value = "";
  document.getElementById("input-age").value = "";
  document.getElementById("input-type").value = "Select Type";
  document.getElementById("input-weight").value = "";
  document.getElementById("input-length").value = "";
  document.getElementById("input-color-1").value = "";
  document.getElementById("input-breed").value = "Select Breed";
  document.getElementById("input-vaccinated").checked = false;
  document.getElementById("input-dewormed").checked = false;
  document.getElementById("input-sterilized").checked = false;
  // Ẩn form sau khi submit thành công
  document.getElementById("container-form").classList.add("hide");
});

// Hàm kiểm tra dữ liệu
function validateData(data, petArr) {
  // Validate theo yêu cầu
  if (
    data.id === "" ||
    data.name === "" ||
    isNaN(data.age) ||
    data.type === "Select Type" ||
    isNaN(data.weight) ||
    isNaN(data.length) ||
    data.breed === "Select Breed"
  ) {
    alert("Please fill in all fields!");
    return false;
  }
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  }

  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  }

  if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  }

  return true;
}
