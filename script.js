"use strict";
// Lấy tham chiếu đến các phần tử của form
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const breedInput = document.getElementById("input-breed");
const colorInput = document.getElementById("input-color-1");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
// thay đổi kiểu hiển thị sidebar
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const sidebarToggleBtn = document.querySelector(".sidebar-header");

  sidebarToggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });
});
// Dữ liệu thú cưng
const petArr = JSON.parse(getFromStorage("petArr")) ?? "[]";

// Lấy ra các DOM element
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const calculateBmiBtn = document.getElementById("calculate-bmi-btn");
const tbody = document.getElementById("tbody");

// Biến để kiểm tra xem đang hiển thị tất cả thú cưng hay chỉ thú cưng khỏe mạnh
let healthyCheck = false;

// Thêm sự kiện khi click vào nút Submit
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseFloat(weightInput.value),
    length: parseFloat(lengthInput.value),
    breed: breedInput.value,
    color: colorInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    dateAdded: new Date().toLocaleDateString(),
  };

  // Validate dữ liệu
  const validate = validateData(data);

  if (validate) {
    petArr.push(data);
    clearInput();
    renderTableData(healthyCheck ? getHealthyPets() : petArr);
    saveToStorage("petArr", JSON.stringify(petArr)); // Lưu dữ liệu vào LocalStorage
  }
});

// Thêm sự kiện khi click vào nút Show Healthy Pet/Show All Pet
healthyBtn.addEventListener("click", function () {
  healthyCheck = !healthyCheck;
  healthyBtn.textContent = healthyCheck ? "Show All Pet" : "Show Healthy Pet";
  renderTableData(healthyCheck ? getHealthyPets() : petArr);
});

// Hàm render dữ liệu vào bảng
function renderTableData(data) {
  // Xóa nội dung hiện tại của bảng
  tbody.innerHTML = "";

  // Duyệt qua từng thú cưng và thêm vào bảng
  data.forEach((pet) => {
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
        <button type="button" class="btn btn-danger" onclick="deletePet('${
          pet.id
        }')">Delete</button>
      </td>
     
    `;

    // Thêm hàng vào tbody
    tbody.appendChild(row);
  });
}

// Hàm xóa một thú cưng
function deletePet(petId) {
  // Confirm trước khi xóa
  if (confirm("Are you sure?")) {
    // Code để xóa thú cưng có id là petId từ petArr
    const index = petArr.findIndex((pet) => pet.id === petId);
    if (index !== -1) {
      petArr.splice(index, 1);
      renderTableData(healthyCheck ? getHealthyPets() : petArr);
      saveToStorage("petArr", JSON.stringify(petArr)); // Lưu dữ liệu vào LocalStorage
    }
  }
}

// Hàm validate dữ liệu
function validateData(data) {
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

  if (petArr.some((pet) => pet.id === data.id)) {
    alert("ID must be unique!");
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

// Hàm xóa dữ liệu trong các input
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// Hàm lấy danh sách thú cưng khỏe mạnh
function getHealthyPets() {
  return petArr.filter(
    (pet) => pet.vaccinated && pet.dewormed && pet.sterilized
  );
}

// Hiển thị dữ liệu ban đầu
renderTableData(petArr);

// Lấy dữ liệu từ LocalStorage
const storedBreedArr = JSON.parse(getFromStorage("breedArr")) || [];

// Thêm sự kiện change cho input type
typeInput.addEventListener("change", function () {
  const selectedType = typeInput.value;
  const filteredBreeds = storedBreedArr.filter(
    (breed) => breed.type === selectedType
  );
  renderBreed(filteredBreeds);
});

// Hàm render Breed vào dropdown list
function renderBreed(breeds) {
  breedInput.innerHTML = ""; // Xóa tất cả các option hiện tại
  // Tạo option mặc định "Select Breed"
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Select Breed";
  breedInput.appendChild(defaultOption);

  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.textContent = breed.name;
    breedInput.appendChild(option);
  });
}

// Gọi hàm renderBreed với dữ liệu từ LocalStorage
renderBreed(storedBreedArr);
