import fs from "fs";
import * as cp from "child_process";

let handleTestFunction = `function handleTests(testCases, func) {
    let errors;
    let testCase;
    let expectedOut;
    let yourOut;
    let testCaseNumber;
    let ERR;
    for (let i = 0; i < testCases.length; i++) {
        let out;
        try {
            const input = testCases[i].slice(0, testCases[i].length - 1);
            const exOutput = testCases[i][testCases[i].length - 1];
            out = func(...input);
            if (!equality(out, exOutput)) {
                testCase = testCases[i];
                expectedOut = exOutput;
                yourOut = out;
                testCaseNumber = i;

                ERR = \`Wrong answer\nTest Case Number: \${i}\nInput: \${JSON.stringify(
                    input
                )}\nExpected Output: \${exOutput}\nYour Output: \${out}\`;
            }
        } catch (e) {
            return e;
        }
    }
    if (errors == undefined && testCase == undefined) return "Success";
    return {
        error_message: ERR,
        test_case_number: testCaseNumber,
        test_case: testCase,
        expected_output: expectedOut,
        user_output: yourOut,
    };
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
) {
    let data =
        codeBody +
        handleTestFunction +
        `console.log(handleTests(${JSON.stringify(
            testCases
        )}, ${functionName}));`;

    fs.writeFile("./test/test.js", data, (err) => {
        console.error(err);
    });
    return new Promise((resolve, reject) => {
        cp.exec("node ./test/test.js", (error, stdout, stderr) => {
            if (error) {
                return reject(error);
            }
            resolve([stdout, stderr]);
        });
    });
}
