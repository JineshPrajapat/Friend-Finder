import React from "react";

function InputField({label,type,name,value, onChange}){
    return(
        <div className="space-y-2 mb-4">
            <label className="block text-gray-700 text-left">{label}</label>
            <input  
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:border-blue-500"
            />
        </div>
    );
};

export default InputField;