import React, { useState, useEffect } from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { useSearchParams } from 'react-router-dom'
import { app } from '../firebase'
function Profile() {
  const fileRef = useRef(null)
  const currentUser = useSelector((state => state.user))
  const [file, setFile] = useState(undefined)
  const [filePersentage, setfilePersentage] = useState(0)
  const [fileUploladedError, setFileUploadedError] = useState(false)
  const [formdata, setFormdata] = useState({})
  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file]);


  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setfilePersentage(Math.round(progress))
        // console.log('upload is ', progress , "% uploaded is done " )
      }),
      (error) => { setFileUploadedError(true) },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => {
            setFormdata({ ...formdata, avatar: downloadURL })
          }
        )
      }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl  font-semibold text-center my-7'>profile</h1>
      <form className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='images/*' />
        <img onClick={fileRef.current.click()} src={formdata.avatar || currentUser.avatar} alt='profile' className=' rounded-full h-24 w-24 object-cover  cursor-pointer self-center mt-2' />
        <p className='text-sm self-center'>
          {fileUploladedError ? (
            <span className='text-red-700'>Error in uploading</span>
          ) : filePersentage > 0 && filePersentage < 100 ? (
            <span className='text-slate-700'>{`uploading ${filePersentage} %`}</span>
          ) : filePersentage === 100 ? (
            <span className='text-green-700'>Image successfully downloaded</span>
          ) : null}
        </p>

        <input type='text' placeholder='username' id='username' className='border p-3 rounded-lg' />
        <input type='email' placeholder='email' id='email' className='border p-3 rounded-lg' />
        <input type='password' placeholder='password' id='password' className='border p-3 rounded-lg' />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80' >Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile