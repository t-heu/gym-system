import { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';

import 'react-toastify/dist/ReactToastify.css';

import colors from './colors';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, select, textarea {
    font: 14px 'Roboto', sans-serif;
    color: ${colors.blackIsh};
  }

  h1 {font-size: 24px;}

  a {
    text-decoration: none;
  }

  a:visited {color: inherit;}

  ul {
    list-style: none;
  }

  /* BUTTONS */

  button {
    cursor: pointer;

    &:active {
      transform: translate(1px, 2px)
    }
  }

  .button__submit {
    height: 36px;
    display: flex;
    align-self: stretch;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    border-radius: 4px;
    border: none;
    background: ${colors.primary};
    transition: background 0.2s ease;

    &:hover {
      background: ${darken(0.1, colors.primary)};
    }
  }

  /* FORMS */
  form {
    label {
      display: block;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    span {
        display: block;
        color: ${colors.primary};
        font-weight: normal;
        transform: translateY(-16px);
        text-transform: capitalize;
    }

    input  {
      height: 36px;
      display: flex;
      align-items: center;
      background: #fff;
      border: 1px solid ${colors.grayLight};
      border-radius: 4px;
      padding: 4px;
      padding: 0 14px;

      &:read-only {
        background-color: ${colors.grayEvenLighter};
      }
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }

    & ::placeholder {
      color: ${colors.grayMedium};
    }

    select  {
      height: 36px;
      margin-top: 8px;
      display: flex;
      align-items: center;
      background-color: #fff;
      background-image: url(arrowDown);
      border: 1px solid ${colors.grayLight};
      border-radius: 4px;
      padding: 0 14px;

      appearance: none;

      &:before {
        content: 'teste';
        position: absolute;

        top: 0;
        left: 0;
        width: 10px;
        height: 10px;
        display: flex;
        background: red;
      }

    }

    textarea {
      width: 100%;
      height: 127px;
      margin-top: 10px;
      margin-bottom: 20px;
      border: 1px solid ${colors.grayLight};
      border-radius: 4px;
      padding: 12px;
    }

  }

  /* TABLES */

  table {
    border-spacing: 0;
    border-collapse: collapse;
    width: 100%;
    color: ${colors.grayHeavy};


    thead {
      font-weight: bold;
      text-transform: uppercase;

      td {
        padding: 0px 10px 0 0;
      }
    }

    tbody {

      tr {
        &:last-child td {
          padding-bottom: 0 !important;
        }
      }

      & tr + tr {
        border-top: 1px solid ${colors.grayLighter};
      }

      td {
        padding: 20px 10px 20px 0;

        & a + a {
          margin-left: 10px;
        }

        .inline__edit { color: ${colors.warnDefault}; }
        .inline__delete { color: ${colors.warnDanger}; }

      }
    }

    /* utils */

    .tdCenter {
      text-align: center;
      padding-left: 10px;
    }

    .shrink {
      width: 0.1%;
      white-space: pre-wrap;
    }
  }
`;
