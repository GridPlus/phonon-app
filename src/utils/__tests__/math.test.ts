import { PhononDTO } from "../../types";
import {
  DenominationAmount,
  makeChange,
  makeChangeWithPhonons,
  rollupChange,
} from "../math";

describe("change making", () => {
  test("should make change", () => {
    const mock: DenominationAmount[] = [
      { denomination: "10", amount: 1 },
      { denomination: "1", amount: 1 },
      { denomination: "0.1", amount: 1 },
      { denomination: "0.01", amount: 1 },
      { denomination: "0.001", amount: 2 },
      { denomination: "0.0001", amount: 1 },
    ];

    expect(makeChange(11.1121)).toStrictEqual(mock);
  });
  test("should rollup change", () => {
    const mock: DenominationAmount[] = [
      { denomination: "100", amount: 1 },
      { denomination: "10", amount: 1 },
      { denomination: "20", amount: 1 },
      { denomination: "1", amount: 1 },
    ];

    expect(rollupChange(mock)).toBe(131);
  });
  test("should rollup float change", () => {
    const mock: DenominationAmount[] = [
      { denomination: "10", amount: 1 },
      { denomination: "1", amount: 1 },
      { denomination: "0.1", amount: 1 },
      { denomination: "0.01", amount: 1 },
      { denomination: "0.001", amount: 2 },
      { denomination: "0.0001", amount: 1 },
    ];

    expect(rollupChange(mock)).toBe(11.1121);
  });
  test("should rollup float change", () => {
    const mock: DenominationAmount[] = [
      { denomination: "1", amount: 1 },
      { denomination: "0.001", amount: 1 },
      { denomination: "0.0001", amount: 1 },
    ];

    expect(rollupChange(mock)).toBe(1.0011);
  });
  test("should make change with phonons", () => {
    const phonons: PhononDTO[] = [
      {
        KeyIndex: 40,
        PubKey: "a",
        Address: "",
        AddressType: 0,
        SchemaVersion: 0,
        ExtendedSchemaVersion: 0,
        Denomination: "10",
        CurrencyType: 0,
      },
      {
        KeyIndex: 41,
        PubKey: "a",
        Address: "",
        AddressType: 0,
        SchemaVersion: 0,
        ExtendedSchemaVersion: 0,
        Denomination: "0.1",
        CurrencyType: 0,
      },
      {
        KeyIndex: 39,
        PubKey: "b",
        Address: "",
        AddressType: 0,
        SchemaVersion: 0,
        ExtendedSchemaVersion: 0,
        Denomination: "1",
        CurrencyType: 2,
      },
      {
        KeyIndex: 42,
        PubKey: "b",
        Address: "",
        AddressType: 0,
        SchemaVersion: 0,
        ExtendedSchemaVersion: 0,
        Denomination: "1",
        CurrencyType: 2,
      },
      {
        KeyIndex: 43,
        PubKey: "c",
        Address: "",
        AddressType: 0,
        SchemaVersion: 0,
        ExtendedSchemaVersion: 0,
        Denomination: "0.01",
        CurrencyType: 2,
      },
      {
        KeyIndex: 44,
        PubKey: "d",
        Address: "",
        AddressType: 0,
        SchemaVersion: 0,
        ExtendedSchemaVersion: 0,
        Denomination: "0.001",
        CurrencyType: 2,
      },
    ];

    expect(makeChangeWithPhonons(1.111, phonons)).toMatchInlineSnapshot(`
      Array [
        Object {
          "Address": "",
          "AddressType": 0,
          "CurrencyType": 0,
          "Denomination": "10",
          "ExtendedSchemaVersion": 0,
          "KeyIndex": 40,
          "PubKey": "a",
          "SchemaVersion": 0,
        },
        Object {
          "Address": "",
          "AddressType": 0,
          "CurrencyType": 2,
          "Denomination": "1",
          "ExtendedSchemaVersion": 0,
          "KeyIndex": 39,
          "PubKey": "b",
          "SchemaVersion": 0,
        },
        Object {
          "Address": "",
          "AddressType": 0,
          "CurrencyType": 2,
          "Denomination": "1",
          "ExtendedSchemaVersion": 0,
          "KeyIndex": 42,
          "PubKey": "b",
          "SchemaVersion": 0,
        },
        Object {
          "Address": "",
          "AddressType": 0,
          "CurrencyType": 0,
          "Denomination": "0.1",
          "ExtendedSchemaVersion": 0,
          "KeyIndex": 41,
          "PubKey": "a",
          "SchemaVersion": 0,
        },
        Object {
          "Address": "",
          "AddressType": 0,
          "CurrencyType": 2,
          "Denomination": "0.01",
          "ExtendedSchemaVersion": 0,
          "KeyIndex": 43,
          "PubKey": "c",
          "SchemaVersion": 0,
        },
        Object {
          "Address": "",
          "AddressType": 0,
          "CurrencyType": 2,
          "Denomination": "0.001",
          "ExtendedSchemaVersion": 0,
          "KeyIndex": 44,
          "PubKey": "d",
          "SchemaVersion": 0,
        },
      ]
    `);
  });
});
