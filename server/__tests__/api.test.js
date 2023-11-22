import getDataFromOpenAI from '../api';

// Mock the entire module
jest.mock('../api', () => ({
    __esModule: true, // This property is required for mocking default exports
    default: jest.fn(),
    // requestDataFromOpenAI: jest.fn(), // Only necessary if requestDataFromOpenAI is exported and used elsewhere
}));

describe('testing getDataFromOpenAI', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should return formatted data from Open AI', async () => {
        // Mock response simulating the OpenAI API response
        const mockAPIResponse = {
            choices: [
                {   
                    text: "- Learn basic programming concepts\n" +
                          "- Practice with simple coding exercises\n" +
                          "- Build a small project to apply learned skills"
                }
            ]
        };

        // Mock implementation of getDataFromOpenAI
        getDataFromOpenAI.mockResolvedValue([
            { project: "Learn basic programming concepts" },
            { project: "Practice with simple coding exercises" },
            { project: "Build a small project to apply learned skills" }
        ]);

        // The request object to pass to getDataFromOpenAI
        const request = { project: "learn to code", description: "coding is hard" };

        // Calling the function
        const result = await getDataFromOpenAI(request);

        // The expected result after formatting the response
        const expectedFormattedData = [
            { project: "Learn basic programming concepts" },
            { project: "Practice with simple coding exercises" },
            { project: "Build a small project to apply learned skills" }
        ];

        // Asserting that the result matches the expected output
        expect(result).toEqual(expectedFormattedData);
    });
});
