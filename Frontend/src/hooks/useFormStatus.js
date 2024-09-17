import { useState } from "react";

const useFormStatus=()=>{
    const [status,setStatus]=useState('idle');
    const [error, setError]= useState(null);
    const [success, setSuccess] = useState('');

    const startSubmitting=()=>{
        setStatus('submitting');
        setError(null);
    }

    const submitSuccess=(successMessage)=>{
        setStatus('success');
        setSuccess(successMessage);
        setError(null);
    }

    const submitError=(errorMessage)=>{
        setStatus('error');
        setError(errorMessage);
    }

    const resetFormStatus=()=>{
        setStatus('idle');
        setError(null);
    }

    return {status, error,success, startSubmitting, submitSuccess, submitError, resetFormStatus};
}

export default useFormStatus