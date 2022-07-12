import { isValidPhononDenomination } from "../validation";

describe("validation", () => {
  test("should validate phonon denomination ", () => {
    const mock = [
      { input: "10", output: true },
      { input: "100", output: true },
      { input: ".1", output: true },
      { input: "0.00001", output: true },
      { input: "155", output: true },
      { input: "199", output: true },
      { input: "15000", output: true },
      { input: "12000", output: true },
      { input: "254", output: true },
      { input: "255", output: true },
      { input: "0.000195", output: true },
      { input: "256", output: false },
      { input: "956", output: false },
      { input: "0.000001956", output: false },
      { input: ".000001956", output: false },
      { input: "0.1000750000", output: false },
      { input: "0.10010", output: false },
    ];
    mock.forEach(({ input, output }) => {
      expect(isValidPhononDenomination(input)).toBe(output);
    });
  });
});
