const semesterInput = document.getElementById("semester");
const courseTable = document.getElementById("course-table");
const addCourseButton = document.getElementById("add-course");
const clearAllButton = document.getElementById("clear-all");
const calculateButton = document.getElementById("calculate");
const gpaResult = document.getElementById("gpa-result");

const semesters = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

let currentSemesterIndex = 0;

function calculateGPA() {
    const gradeInputs = Array.from(document.querySelectorAll("select[name^='grade']"));
    const creditsInputs = Array.from(document.querySelectorAll("input[name^='credits']"));

    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 0; i < gradeInputs.length; i++) {
        const grade = gradeInputs[i].value;
        const credits = parseFloat(creditsInputs[i].value);

        if (grade && credits) {
            let points = 0;

            switch (grade) {
                case "A+":
                    points = 4.00 * credits;
                    break;
                case "A":
                    points = 3.75 * credits;
                    break;
                case "B+":
                    points = 3.50 * credits;
                    break;
                case "B":
                    points = 3.00 * credits;
                    break;
                case "C":
                    points = 2.50 * credits;
                    break; 
                case "D":
                    points = 1.75 * credits;
                    break;   
                case "F":
                    points = 0;
                    break;
                default:
                    alert("Invalid grade.");
                    return;
            }

            totalCredits += credits;
            totalPoints += points;
        }
    }

    const gpa = totalPoints / totalCredits;
    gpaResult.textContent = `GPA: ${gpa.toFixed(2)}`;
}

function addCourse() {
    if (currentSemesterIndex >= semesters.length) {
        alert("You have reached the maximum number of subject.");
        return;
    }

    const courseRow = `
        <tr>
            <td>
            <select  name="grade[]" required>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
          </td>
            <td><input type="number" name="credits[]" min="1" max="10" required></td>
        </tr>
    `;

    courseTable.querySelector("tbody").insertAdjacentHTML("beforeend", courseRow);
    currentSemesterIndex++;
    semesterInput.value = semesters[currentSemesterIndex];
}

function clearAllCourses() {
    courseTable.querySelector("tbody").innerHTML = "";
    currentSemesterIndex = 0;
    semesterInput.value = semesters[currentSemesterIndex];
    gpaResult.textContent = "";
}

addCourseButton.addEventListener("click", addCourse);
clearAllButton.addEventListener("click", clearAllCourses);
calculateButton.addEventListener("click", calculateGPA);

// Initialize the first semester
addCourse();