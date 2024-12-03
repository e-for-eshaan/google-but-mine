"use client";

import React, { useState, useRef, DragEvent, ChangeEvent } from 'react'

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles(prevFiles => [...prevFiles, ...newFiles])
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles(prevFiles => [...prevFiles, ...newFiles])
    }
  }
  const triggerFileInput = () => {
    fileInputRef.current?.click?.()
  }

  return (
    <div className="w-full h-[284px] bg-background rounded-lg border-dashed border-[#3C4043] border-[1px] flex flex-col">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="rounded-lg p-6 text-center flex w-full flex-grow justify-center items-center gap-[18px] mt-6"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
        />
        <div className="text-6xl text-gray-400 mb-4 text-center">
          <DropImageDrop />
        </div>
        <p className="text-[#94969B] mb-4">
          Drag an image here or <a onClick={triggerFileInput} className='text-link cursor-pointer hover:underline'>upload a file</a>
        </p>
      </div>
      <Rule />
      <div className='p-5 pt-0 flex justify-between gap-2'>
        <input placeholder='Paste image link' className='text-[14px] w-[390px] h-[42px] border-[0.5px] border-secondary px-6 bg-[#313134]' style={{ borderRadius: 24 }} />
        <button className='bg-[#313134] hover:bg-[#1E1E22] border-[0.5px] border-secondary px-6 flex-grow' style={{ borderRadius: 24 }} ><a className='text-link'>Search</a></button>
      </div>
    </div>
  )
}

const Rule = () => {
  return <div className='flex px-5 text-gray-400 mb-4'>
    <div className='border-b-[1px] border-secondary h-1/2 flex-grow'></div>
    <div className='px-5 flex justify-center items-center text-[14px]'>OR</div>
    <div className='border-b-[1px] border-secondary h-1/2 flex-grow'></div>
  </div>
}


const DropImageDrop = () => {
  return <svg width="59" height="45" viewBox="0 0 59 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40.3332 13.747L1.58323 13.747L1.58323 43.4553L40.3332 43.4553L40.3332 13.747Z"></path><path d="M40.3332 13.747L17.0832 13.747L17.0832 33.122L40.3332 33.122L40.3332 13.747Z" className="qOFLsb"></path><path fillRule="evenodd" clipRule="evenodd" d="M0.614479 12.7783L6.74988 12.7783L6.74988 14.7158L2.55198 14.7158L2.55198 18.9137L0.614479 18.9137L0.614479 12.7783Z" fill="#BDC1C6"></path><path fillRule="evenodd" clipRule="evenodd" d="M39.3644 42.4866L39.3644 38.2887L41.3019 38.2887L41.3019 44.4241L35.1665 44.4241L35.1665 42.4866L39.3644 42.4866Z" fill="#BDC1C6"></path><path fillRule="evenodd" clipRule="evenodd" d="M0.614479 38.2887L2.55198 38.2887L2.55198 42.4866L6.74987 42.4866L6.74987 44.4241L0.614479 44.4241L0.614479 38.2887Z" fill="#BDC1C6"></path><path d="M19.6665 30.2531H58.4165L58.4165 0.544722H19.6665L19.6665 30.2531Z" fill="#AECBFA"></path><path d="M19.6665 21.8429L19.6665 30.2525L58.4168 30.2525L58.4168 19.7406L49.6667 12.4069C48.6234 11.5342 47.2931 11.0699 45.9272 11.1018C44.5614 11.1337 43.2547 11.6596 42.2542 12.5801L33.4166 20.7918L28.4166 17.2548C27.7332 16.7781 26.9013 16.5563 26.0684 16.6288C25.2354 16.7012 24.4554 17.0632 23.8666 17.6505L19.6665 21.8429Z" fill="#669DF6"></path><path d="M30.0056 12.9386C31.7315 12.9386 33.1306 11.5395 33.1306 9.8136C33.1306 8.08773 31.7315 6.68863 30.0056 6.68863C28.2798 6.68863 26.8807 8.08773 26.8807 9.8136C26.8807 11.5395 28.2798 12.9386 30.0056 12.9386Z" fill="#E8F0FE"></path></svg>
}

export default FileUpload;