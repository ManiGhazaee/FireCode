import acorn from "acorn";

let handleTestFunction = `
function handleTests(testCases, func) {
    let testCase;
    let problemInput;
    let expectedOut;
    let yourOut;
    let testCaseNumber;
    let status;
    let ERR;
    let date = new Date();
    let runtime;
    let t1;
    for (let i = 0; i < testCases.length; i++) {
            let out;
            try {
                    const input = testCases[i].slice(0, testCases[i].length - 1);
                    const exOutput = testCases[i][testCases[i].length - 1];
                    t1 = performance.now();
                    out = func(...input);
                    if (!equality(out, exOutput)) {
                            problemInput = JSON.stringify(input);
                            testCase = testCases[i];
                            expectedOut = JSON.stringify(exOutput);
                            yourOut = JSON.stringify(out);
                            testCaseNumber = i;
                            status = "Wrong Answer";

                            ERR = \`Wrong answer; Test Case Number: \${i}; Input: \${JSON.stringify(input)}; Expected Output: \${exOutput}; Your Output: \${out};\`;
                    }
            } catch (e) {
                    ERR = e;
                    status = "Runtime Error";
            }
    }
    runtime = performance.now() - t1;

    if (ERR == undefined && testCase == undefined) status = "Accepted";
    return \`{ "status":"\${status}",\n"date":"\${date}",\n"runtime": "\${runtime}",\n"error_message": "\${ERR}",\n"test_case_number" :"\${testCaseNumber}",\n"test_case":"\${testCase}",\n"input": "\${problemInput}",\n"expected_output":"\${expectedOut}",\n"user_output":"\${yourOut}"\n}\`;
}

function equality(item1, item2) {
    const isArrayItem1 = Array.isArray(item1);
    const isArrayItem2 = Array.isArray(item2);
    if (isArrayItem1 !== isArrayItem2) return false;
    if (isArrayItem1) {
            if (item1.length !== item2.length) return false;
            for (let i = 0; i < item1.length; i++) {
                    const indexof = item2.indexOf(item1[i]);
                    if (indexof === -1) return false;
                    item2.splice(indexof, 1);
            }
            if (item2.length !== 0) return false;
            else return true;
    }
    return item1 === item2;
}`;

export function writeTestFile(
    codeBody: string,
    testCases: any[][],
    functionName: string
): Promise<WriteFileOut> {
    try {
        acorn.parse(codeBody, { ecmaVersion: 2022 });
    } catch (e) {
        console.log(e);
        return new Promise((resolve, reject) => {
            reject({
                stdout: {
                    status: "Runtime Error",
                    date: new Date(),
                    runtime: 0,
                    error_message: "Runtime Error",
                    test_case_number: undefined,
                    test_case: undefined,
                    expected_output: undefined,
                    user_output: undefined,
                },
                stdout_string: e as string,
                stderr: "",
                code_body: codeBody,
            });
            resolve({
                stdout: {
                    status: "Runtime Error",
                    date: new Date(),
                    runtime: 0,
                    error_message: e as string,
                    test_case_number: undefined,
                    test_case: undefined,
                    expected_output: undefined,
                    user_output: undefined,
                },
                stdout_string: e as string,
                stderr: "",
                code_body: codeBody,
            });
        });
    }
    let data =
        "(function x() { try {" +
        codeBody +
        handleTestFunction +
        `try { return (handleTests(${JSON.stringify(
            testCases
        )}, ${functionName})); } catch (e) { return (\`{ "status":"Runtime Error",
        "date":"${new Date()}",
        "runtime": 0,
        "error_message": "\${e}",
        "test_case_number" :"undefined",
        "test_case":"undefined",
        "expected_output":"undefined",
        "user_output":"undefined"
        }\`); }} catch (e) { return (\`{ "status":"Runtime Error",
        "date":"${new Date()}",
        "runtime": 0,
        "error_message": "\${e}",
        "test_case_number" :"undefined",
        "test_case":"undefined",
        "expected_output":"undefined",
        "user_output":"undefined"
        }\`); }})()`;

    return new Promise((resolve, reject) => {
        try {
            const stdout = eval(data);
            console.log(stdout);
            resolve({
                stdout: JSON.parse(stdout),
                stdout_string: stdout,
                stderr: "",
                code_body: codeBody,
            });
        } catch (error) {
            return reject({
                stdout: error,
                stdout_string: "",
                stderr: "",
                code_body: codeBody,
            });
        }
    });
}

interface WriteFileOut {
    stdout?:
        | {
              status: "Accepted" | "Wrong Answer" | "Runtime Error";
              date: Date;
              runtime: number;
              error_message?: string;
              test_case_number?: number;
              test_case?: any[];
              input?: string;
              expected_output?: any;
              user_output?: any;
          }
        | undefined;
    stdout_string: string;
    stderr: string;
    code_body: string;
}
