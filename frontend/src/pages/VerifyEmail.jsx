import React from 'react'

function VerifyEmail() {
  return (
    <div className='relative w-full overflow-hidden h-[720px]'>
      <div className="min-h-screen flex justify-center items-center bg-green-100 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
                ✅Check Your Email
            </h2>
            <p className="text-gray-400 text">
              We have sent an email to verify your account click on verification link
            </p>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail
