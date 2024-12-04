
const name = document.querySelector("#courseName");
const category = document.querySelector("#courseCategory");
const price = document.querySelector("#coursePrice");
const description = document.querySelector("#courseDescription");
const capacity = document.querySelector("#courseCapacity");
const add_btn = document.querySelector("#add_btn");
const search = document.querySelector("#search");
const delete_btn = document.querySelector("#deleteBtn");
let mode = "create";
let updateIndx = 0;
let courses = [];
let c = [];
c.push(1);
console.log(c);
if (localStorage.getItem("course") != null){
  courses = JSON.parse(localStorage.getItem("course"));
  c.push(JSON.parse(localStorage.getItem("course")));
  showCourses(courses);
}
add_btn.addEventListener("click",(e)=>{
  e.preventDefault();
  is_valid =  true;
  const name_pattern = /^[A-Z][a-z]{2,8}$/;
  const category_pattern = /^[A-Z][a-z]{2,5}$/;
  const price_pattern = /^[+]?([0-9]*[.])?[0-9]+$/;
  const description_pattern = /<\/?[a-z][\s\S]*>/i;
  const capacity_pattern = /^-?\d+$/;
  if (!name_pattern.test(name.value)){
    document.querySelector(".invalid-name").innerHTML = "name must start with capital following by from 2 - 8 small letters"
    name.classList.add("is-invalid");
    is_valid = false;
   }
   else{
    document.querySelector(".invalid-name").innerHTML = "";
    name.classList.remove("is-invalid");
    name.classList.add("is-valid");
   }
   
   if (!category_pattern.test(category.value)){
    document.querySelector(".invalid-category").innerHTML = "category must start with capital following by from 2 - 5 small letters"
    category.classList.add("is-invalid");
    is_valid = false;
   }
   else{
    document.querySelector(".invalid-category").innerHTML = "";
    category.classList.remove("is-invalid");
    category.classList.add("is-valid");
   }

   if (!price_pattern.test(price.value)){
    document.querySelector(".invalid-price").innerHTML = "price must be positive and has at least one digit after the decimal point"
    price.classList.add("is-invalid");
    is_valid = false;
   }
   else{
    document.querySelector(".invalid-price").innerHTML = "";
    price.classList.remove("is-invalid");
    price.classList.add("is-valid");
   }

   if(!(description.value.length >= 10 && description.value.length <= 500)){
    document.querySelector(".invalid-description").innerHTML = "the number of chars must be at least 10 chars and at maximum 500 chars"
    description.classList.add("is-invalid");
    is_valid = false;
   }
   else if(description_pattern.test(description.value)){
    document.querySelector(".invalid-description").innerHTML = "must didn't contain any html tag"
    description.classList.add("is-invalid");
    is_valid = false;
   }
   else{
    document.querySelector(".invalid-description").innerHTML = "";
    description.classList.remove("is-invalid");
    description.classList.add("is-valid");
   }
   
   if(!(capacity.value >= 20 && capacity.value <= 50)){
    document.querySelector(".invalid-capacity").innerHTML = "the number of students must be at least 20 students and at maximum 50 students"
    capacity.classList.add("is-invalid");
    is_valid = false;
   }
   else if(!capacity_pattern.test(capacity.value)){
    document.querySelector(".invalid-capacity").innerHTML = "capacity must be a positive integer number (not fractional)"
    capacity.classList.add("is-invalid");
    is_valid = false;
   }
   else{
    document.querySelector(".invalid-capacity").innerHTML = "";
    capacity.classList.remove("is-invalid");
    capacity.classList.add("is-valid");
   }

   if (is_valid){
    course = {
      name: name.value,
      category: category.value,
      price: price.value,
      description: description.value,
      capacity: capacity.value,
    };
    
    if (mode == "create"){
    courses.push(course);
    
    Swal.fire({
      title: 'Add Course',
      text: 'course added successfult',
      icon: 'success',
    })
  }

  else{
    courses[updateIndex] = course;
    mode = "create";
    add_btn.setAttribute("value","Add Course");
    Swal.fire({
      title: 'Update Course',
      text: 'course updated successfult',
      icon:'success',
    })
  }
    localStorage.setItem("course", JSON.stringify(courses));
    
    
    showCourses(courses);
    document.querySelector("form").reset();
    name.classList.remove("is-valid");
    category.classList.remove("is-valid");
    price.classList.remove("is-valid");
    description.classList.remove("is-valid");
    capacity.classList.remove("is-valid");


  
   }
  
});


function showCourses(courses){
  courses_info = courses.map((course,index)=>{
    return `
    <tr>
      <td>${index}</td>
      <td>${course.name}</td>
      <td>${course.category}</td>
      <td>${course.price}</td>
      <td>${course.description}</td>
      <td>${course.capacity}</td>
      <td><button onclick="updateCourse(${index})" class="btn btn-danger">Update</button></td>
      <td><button onclick="deleteCourse(${index})" class="btn btn-danger">Delete</button></td>
    </tr>
    `;
  }).join("");

  document.querySelector("#data").innerHTML = courses_info;

};

function deleteCourse(index){
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      courses.splice(index, 1);
      localStorage.setItem("course", JSON.stringify(courses));
      showCourses(courses);
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
}

  delete_btn.addEventListener("click", () =>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete all!"
    }).then((result) => {
      if (result.isConfirmed) {
        courses = [];
        localStorage.setItem("course", JSON.stringify(courses));
        showCourses(courses);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  });
  
  search.addEventListener("input", (event) => {

    const filtered_courses = courses.filter((course) =>{
      return course.name.toLowerCase().includes(event.target.value.toLowerCase());
    });

    showCourses(filtered_courses);

  })

function updateCourse(index){
  let course = courses[index];
  name.value = course.name;
  category.value = course.category;
  price.value = course.price;
  description.value = course.description;
  capacity.value = course.capacity;
  add_btn.setAttribute("value","Update Course");
  mode = "update";
  updateIndex = index;    
  scroll({
    top:0,
    behavior:"smooth",
});

}
