module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: ['<rootDir>/jest.setupFilesAfterEnv.ts'],
    setupFiles: ["<rootDir>/jestSetupFile.js"],
    transformIgnorePatterns: [
        "node_modules/(?!(@react-native|react-native|react-native-vector-icons)/)"
    ],
    moduleNameMapper: {
        '^react-native-toast-message$': '<rootDir>/__mocks__/react-native-toast-message.js',
    },
};

