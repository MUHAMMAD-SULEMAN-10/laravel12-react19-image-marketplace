import React from 'react'

export default function useValidation(errors, field) {

    const renderErrors = () => (
        errors?.[field]?.map((error, index) => (
            <div className="fw-bold text-danger"
                key={index}
            >
                { error }
            </div>
        )) 
    )

    return renderErrors()
}
