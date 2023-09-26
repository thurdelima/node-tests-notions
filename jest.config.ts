import type { Config} from '@jest/types';


//change dir for pass_checker, doubles, to test
const baseDir = '<rootDir>/src/app/server_app';
const baseTestDir = '<rootDir>/src/test/server_app2';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        `${baseDir}/**/*.ts`
    ],
    testMatch: [
        // `${baseTestDir}/**/*.ts`,
        `${baseTestDir}/**/*test.ts`
    ]
}

export default config;