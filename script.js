const search = document.getElementById("search");
const courseForm = document.getElementById("course-form");
const random = document.getElementById("random");
const coursesList = document.getElementById("courses");
const resultHeading = document.getElementById("result-heading");
const singleCourse = document.getElementById("single-course");


let coursesData;
function searchCourse(e) {
  // e -> submit event
  // send the form to the backend 
  // we dont want to submit to the backend | default behavior
  e.preventDefault();
  const searchTerm = search.value;


  if (searchTerm.trim()) {
    fetch(`courses.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        coursesData = data;
        resultHeading.innerHTML = `<h2>Search results for '${searchTerm}':</h2>`;

        const myCourse = data.filter((course) => {
          return course.course_name.includes(searchTerm);
        });

        if (myCourse == undefined) {
          resultHeading.innerHTML = `<p>There are no search results. Please try again</p>`;
          coursesList.innerHTML = "";
        } else {
          // coursesList.innerHTML = `
          // <hr/>
          // <h2>${myCourse.course_name}</h2>
          // <p>${myCourse.course_id}</p>
          // <img src="${myCourse.course_img}"  height=200 width=200/> 
          // `;
          coursesList.innerHTML = myCourse.map((course) => {
            return `<div class ="course">
                <img src = "${course.course_img}" alt="${course.course_name}" height="200" width="200">
                <div class ="course-info" data-courseID  = "${course.course_id}">
                <h3>${course.course_name}</h3>
                </div>
            
            </div>`;

          }).join('')
          console.log(`courseList `, coursesList.innerHTML)
        }
      });

    // if (jsonData == null || jsonData.length === 0) {
    //   resultHeading.innerHTML = `<p class="text-center m-2">There are no search results. Try again!</h2>`;
    // } else if (jsonData && coursesList) {
    //   resultHeading.innerHTML = `<p class="text-center m-2">Below are the search results. Try again!</h2>`;
    //   coursesList.innerHTML = jsonData.map((course) => {
    //     return `
    //      <div class='course col-3'>
    //      <img src=${course.course_img} />
    //      <h5>${course.course_name}</h5>
    //      <h6>${course.course_id}</h6>

    //      </div>
    //     `;
    //   });
    // }
    // });
  } else {
    alert("Please enter a search value");
  }
}

courseForm.addEventListener("submit", searchCourse);

//debugger
coursesList.addEventListener("click", function (e) {

  let courseInfo = e.path;
  console.log(`courseForm`, courseInfo);

  let selectedCourse;
  //debugger
  for (let c of courseInfo) {
    if (c.classList !== undefined && c.classList !== null && c.classList.contains("course-info")) {
      selectedCourse = c;
    }
  }
  console.log(`SelectedCourse`, selectedCourse);
  if (selectedCourse) {
    const courseID = selectedCourse.getAttribute("data-courseID");
    const courseData = coursesData.find(function (c) {
      return c.course_id === +courseID;
    });


   // debugger
    console.log(`selectedCourse`, selectedCourse);
    courseToDOM(courseData);
  }
});

//debugger
function courseToDOM(course) {
  resultHeading.innerHTML = '';
  coursesList.innerHTML = '';

  const curriculumItems = course.curriculum.map((value) => {
    return `<span class="badge rounded-pill bg-primary">${value}</span>`
  })
  console.log(`curriculumItems`, curriculumItems);

  singleCourse.innerHTML = `
<div class ="single-course text-center"> 
<h1>${course.course_name}</h1>
<img class="text-center" src="${course.course_img}" alt="${course.course_name}">
<div  class ="">${course.course_description} </div>
<div class ="main"> 
<h3>curriculum</h3>
<ul>
${curriculumItems.join('')}
</ul>
</div>
</div>
`;

}