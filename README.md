# Self - Jest & TypeScript

- 복습: No
- 수강일: 2022년 1월 24일
- 유형: 실습
- 참고자료 및 링크: https://jestjs.io/docs/getting-started#generate-a-basic-configuration-file

---

## 프로젝트 설정

- Jest, Babel, TypeScript 추가
  ```bash
  yarn add --dev jest
  yarn add typescript
  yarn add --dev babel-jest @babel/core @babel/preset-env
  yarn add --dev @babel/preset-typescript
  touch babel.config.js
  ```
- babel 프리셋 설정(babel.config.js 파일 수정)
  ```jsx
  module.exports = {
    presets: [
      ["@babel/preset-env", { targets: { node: "current" } }],
      "@babel/preset-typescript",
    ],
  };
  ```
- 타입스크립트용 node.js 실행기 추가
  ```bash
  yarn add --dev @types/jest
  yarn add --dev ts-node
  jest --init
  ```
