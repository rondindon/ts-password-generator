import { useState } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { copyFail, copySuccess } from './Messages';
import { lowercaseLetters, numbers, specialCharacters, uppercaseLetters } from './Characters';

function App() {
    const [password,setPassword] = useState<string>("");
    const [passwordLength, setPasswordLength] = useState<number>(26);
    const [includeUppercase, setIncludeUppercase] = useState<boolean>(false);
    const [includeLowercase, setIncludeLowercase] = useState<boolean>(false);
    const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
    const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);

    const notify = (message: string, hasError: boolean = false): void => {
      if (hasError) {
        toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }else {
        toast(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }

    const createPassword = (characterList:string) : string => {
      let password = ""
      const characterListLength = characterList.length
      for (let i = 0; i < passwordLength; i++) {
        const characterIndex = Math.round(Math.random() * characterListLength)
        password = password + characterList.charAt(characterIndex)
      }
      return password
    }

    const handleGeneratePassword = (): void => {
      if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        notify("To generate a password you must select atleast one checkbox", true)
      }
      else {
        let characterList : string = ""
        if (includeNumbers) {
          characterList = characterList + numbers
        }
        if (includeUppercase) {
          characterList = characterList + uppercaseLetters
        }
        if (includeLowercase) {
          characterList = characterList + lowercaseLetters
        }
        if (includeSymbols) {
          characterList = characterList + specialCharacters
        }
        setPassword(createPassword(characterList))
        notify("Password generated successfully", false)
      }
    }

    const copyToClipboard = (password:string) => {

      navigator.clipboard.writeText(password)
    }

    const handleCopyPassword = (): void => {
      if (password === '') {
        notify(copyFail, true);
      }else {
        copyToClipboard(password);
        notify(copySuccess);
      }
    }

  return (
    <div className="App">
      <div className="container">
        <div className="generator">
          <h2 className="generator-title">
            Password Generator
          </h2>
          <div className="generator-password">
            <h3 className='password'>{password}</h3>
            <button className="copy-btn">
              <FontAwesomeIcon className='icon' icon={faClipboard} onClick={handleCopyPassword}/>
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="password-strength" className='xd'>Password length</label>
            <input className="pw" defaultValue={passwordLength} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordLength(Number(e.target.value))} type="number" id="password-stregth" name="password-strength" max="26" min="8" />
          </div>
          <div className="form-group">
            <label htmlFor="uppercase-letters">Add Uppercase Letters</label>
            <input checked={includeUppercase} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIncludeUppercase(e.target.checked)} className="check" type="checkbox" id="uppercase-letters" name="uppercase-letters" />
          </div>
          <div className="form-group">
            <label htmlFor="lowercase-letters">Add Lowercase Letters</label>
            <input checked={includeLowercase} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIncludeLowercase(e.target.checked)} className="check" type="checkbox" id="lowercase-letters" name="lowercase-letters" />
          </div>
          <div className="form-group">
            <label htmlFor="include-numbers">Include Numbers</label>
            <input checked={includeNumbers} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIncludeNumbers(e.target.checked)} className="check" type="checkbox" id="include-numbers" name="include-numbers" />
          </div>
          <div className="form-group">
            <label htmlFor="include-symbols">Include Symbols</label>
            <input checked={includeSymbols} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIncludeSymbols(e.target.checked)} className="check" type="checkbox" id="include-symbols" name="include-symbols" />
          </div>

          <button onClick={handleGeneratePassword} className="generator-btn">
            Generate Password
          </button>

        </div>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
      </div>
    </div>
  )
}

export default App;