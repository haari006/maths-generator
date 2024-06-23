let currentQuestion = {};
let streak = 0;
let score = 0;
let totalQuestions = 0;

function generateMathQuestion(difficulty) {
    const operators = ['+', '-', '*', '/'];
    let a, b, c, operator, variable;

    do {
        operator = operators[Math.floor(Math.random() * operators.length)];
        variable = Math.floor(Math.random() * 4); // 0: A, 1: B, 2: C, 3: operator

        // Adjust number range based on difficulty
        const maxNum = 10 + (difficulty * 5);
        a = Math.floor(Math.random() * maxNum) + 1;
        b = Math.floor(Math.random() * maxNum) + 1;

        switch (operator) {
            case '+':
                c = a + b;
                break;
            case '-':
                [a, b] = [Math.max(a, b), Math.min(a, b)]; // Ensure a >= b
                c = a - b;
                break;
            case '*':
                c = a * b;
                break;
            case '/':
                c = a;
                a = b * c;
                break;
        }
    } while (c > 100 || c <= 0 || !Number.isInteger(c));

    let question = '';
    let answer = '';

    switch (variable) {
        case 0: // A is variable
            question = `[?] ${operator} ${b} = ${c}`;
            answer = a.toString();
            break;
        case 1: // B is variable
            question = `${a} ${operator} [?] = ${c}`;
            answer = b.toString();
            break;
        case 2: // C is variable
            question = `${a} ${operator} ${b} = [?]`;
            answer = c.toString();
            break;
        case 3: // operator is variable
            question = `${a} [?] ${b} = ${c}`;
            answer = operator;
            break;
    }

    return { question, answer };
}

function newQuestion() {
    const difficulty = Math.min(Math.floor(streak / 1), 20); // increase difficulty every correct answers, max 20
    currentQuestion = generateMathQuestion(difficulty);
    document.getElementById('question').textContent = currentQuestion.question;
    document.getElementById('answer-input').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('check-btn').disabled = false;
    document.getElementById('next-btn').disabled = true;
    totalQuestions++;
    updateScore();
}

function checkAnswer() {
    const userAnswer = document.getElementById('answer-input').value.trim();
    const feedback = document.getElementById('feedback');
    
    if (userAnswer === currentQuestion.answer) {
        feedback.textContent = 'Correct! Well done!';
        document.getElementById('next-btn').disabled = false;
        document.getElementById('check-btn').disabled = true;
        streak++;
        score++;
    } else {
        feedback.textContent = 'Incorrect. Try again!';
        streak = 0;
    }
    updateScore();
}

function updateScore() {
    document.getElementById('questions').textContent = `Question ${totalQuestions}`;
    document.getElementById('score').textContent = `Score: ${score}/${totalQuestions}`;
    document.getElementById('streak').textContent = `Streak: ${streak}`;
}

// Event listeners
document.getElementById('check-btn').addEventListener('click', checkAnswer);
document.getElementById('next-btn').addEventListener('click', newQuestion);

newQuestion();