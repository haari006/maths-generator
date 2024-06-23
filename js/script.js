function generateMathQuestion() {
    const operators = ['+', '-', '*', '/'];
    let a, b, c, operator, variable;

    do {
        operator = operators[Math.floor(Math.random() * operators.length)];
        variable = Math.floor(Math.random() * 4); // 0: A, 1: B, 2: C, 3: operator

        a = Math.floor(Math.random() * 10) + 1; // 1 to 10
        b = Math.floor(Math.random() * 10) + 1; // 1 to 10

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