function calculateMarks() {

    let studentName =
        document.getElementById("name").value;

    let subject1 =
        Number(document.getElementById("sub1").value);

    let subject2 =
        Number(document.getElementById("sub2").value);

    
    let total = subject1 + subject2;
    let average = total / 2;

    
    let bonusMarks = total;
    bonusMarks += 5;

    
    let isGreater = subject1 > subject2;
    let isEqual = subject1 == subject2;

    
    let bothPassed =
        subject1 > 35 && subject2 > 35;

    let oneExcellent =
        subject1 > 90 || subject2 > 90;

    
    let incrementSub1 = subject1;
    incrementSub1++;

    let decrementSub2 = subject2;
    decrementSub2--;

    
    let status =
        average >= 35 ? "Pass" : "Fail";

    
    let grade;

    if (average >= 90) {
        grade = "A Grade";
    }
    else if (average >= 75) {
        grade = "B Grade";
    }
    else if (average >= 60) {
        grade = "C Grade";
    }
    else if (average >= 35) {
        grade = "D Grade";
    }
    else {
        grade = "Fail";
    }

    document.getElementById("result").innerHTML = `
                <h3>Student: ${studentName}</h3>

                <p><strong>Total Marks:</strong> ${total}</p>

                <p><strong>Average Marks:</strong> ${average}</p>

                <p><strong>Total + 5 Bonus:</strong> ${bonusMarks}</p>

                <p><strong>Is Subject 1 greater than Subject 2:</strong> ${isGreater}</p>

                <p><strong>Both Marks Equal:</strong> ${isEqual}</p>

                <p><strong>Are Both Subjects greater than 35:</strong> ${bothPassed}</p>

                <p><strong>At Least One Subject is greater than 90:</strong> ${oneExcellent}</p>

                <p><strong>Subject 1 After Increment:</strong> ${incrementSub1}</p>

                <p><strong>Subject 2 After Decrement:</strong> ${decrementSub2}</p>

                <p><strong>Status:</strong> ${status}</p>

                <p><strong>Grade:</strong> ${grade}</p>
            `;

            console.log("Normal message");
console.error("Error message");
console.warn("Warning message");
console.table([1,2,3]);
}