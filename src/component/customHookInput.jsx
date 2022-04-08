import { useEffect, useState } from "react";
const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState();
    const [minLengthError, setMinLengthError] = useState(false);
    const [maxLengthError, setMaxLengthError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [formValid, setFormValid] = useState(false);
    useEffect(() => {
        for (const valiadation in validations) {
            switch (valiadation) {
              case "minLength":
                value.length < validations[valiadation]
                  ? setMinLengthError(true)
                  : setMinLengthError(false);
                break;
              case "isEmpty":
                value ? setEmpty(false) : setEmpty(true);
                break;
              case "maxLength":
                value.length > validations[valiadation]
                ? setMaxLengthError(true)
                : setMaxLengthError(false);
              break;
              case "isEmail":
                const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                reg.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                break;
             
        
              default:
                break;
            }
          }
    }, [value]);
    
    useEffect(() => {
      if (isEmpty || minLengthError || maxLengthError || emailError) {
        setFormValid(false);
      } else {
        setFormValid(true);
      }
    }, [isEmpty, minLengthError, emailError , isEmpty ]);
  
    return {
      isEmpty,
      formValid,
      minLengthError,
      maxLengthError,
      emailError
      
    };
  };


const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setDirty] = useState(false);

    const validation = useValidation(value, validations);
    const onChange = (e) => {
      setValue(e.target.value);
    };

    const onBlur = (e) => {
      setDirty(true);
    };

    return {
      value,
      onChange,
      onBlur,
      isDirty,
      ...validation,
    };
  };

  export default useInput