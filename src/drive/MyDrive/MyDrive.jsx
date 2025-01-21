import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineContentPaste } from "react-icons/md";
import { VscNewFolder } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { apicall } from '../../../utils/services';
import * as constants from '../../constants';
import { removeMove } from '../../features/moveSlice';
import File from '../miniComponents/File';
import Folder from '../miniComponents/Folder';
import NewFolder from '../miniComponents/NewFolder';
import Table from '../miniComponents/Table';
export default function MyDrive() {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState({})
    const [searchedData, setSearchedData] = useState({})
    const [quickAccess, setQuickAccess] = useState({})
    const [initialrender, setInitialrender] = useState(true)
    const move = useSelector(state => state.move)
    const { text } = useSelector(state => state.search)
    const dispatch = useDispatch()
    const createFolder = () => {
        console.log(open)
        setOpen(true)
    }
    const getQuickAccess = () => {
        apicall("get", `file-manager/quick-access/`, '', '', (data) => {
            setQuickAccess(data)
            console.log("quick access", data)
        })
    }
    const getData = () => {
        apicall("get", "file-manager/", '', '', (data) => {
            setData(data)
            setSearchedData(data)
        })
    }
    const paste = () => {
        apicall("put", `file-manager/move/${move.type}/`, {}, { "folder_id": move.id }, (data) => {
            getData()
            dispatch(removeMove())
            toast.success(data.status)
        })
    }
    const search = () => {
        let newData = data;
        if (newData.files) {
            let newFiles = newData.files.filter((value) => {
                return (value.filename.toUpperCase().includes(text.toUpperCase()))
            })
            let newFolder = newData.folders.filter((value) => {
                return (value.folder_name.toUpperCase().includes(text.toUpperCase()))
            })
            setSearchedData({ ...data, files: newFiles, folders: newFolder })
            console.log(newFolder)
        }
        if (text == "") {
            setSearchedData(data)
        }
    }
    useEffect(() => {
        search()
    }, [text])
    useEffect(() => {
        if (initialrender) {
            getData()
            getQuickAccess()
            setInitialrender(false)
        }

    }, [initialrender])

    return (
        <div className='w-full h-full ps-8 overflow-auto'>
            <div>
                <h1 className='flex gap-5 text-3xl font-bold text-blue-500 dark:text-white items-center'>My Drive <VscNewFolder className='text-4xl rounded-lg text-white bg-blue-500 dark:bg-neutral-700   hover:bg-blue-400 hover:shadow-xl p-2' onClick={createFolder} /></h1>
            </div>
            <h1 className='text-gray-600 dark:text-gray-50 font-bold text-xl mt-8'>QUICK ACCESS</h1>

            {
                ((quickAccess.folders || quickAccess.files) && (quickAccess.folders.length || quickAccess.files.length)) ?
                    <div className="folders mt-4 flex gap-8 flex-wrap">
                        {quickAccess.folders.length ?
                            quickAccess.folders.map((value, index) => {
                                return (
                                    <Link key={index} to={`/home/Folders/${value.id}`} >
                                        <Folder folderName={value.folder_name} />
                                    </Link>
                                )
                            })
                            :
                            ''
                        }
                        {quickAccess.files.length ?
                            quickAccess.files.map((value, index) => {
                                return (
                                    <a key={index} href={`${constants.BASEURL}download-zip?file_id=${value.id}`}>
                                        <File folderName={value.filename} />
                                    </a>

                                )
                            })
                            :
                            ''
                        }
                    </div>
                    :
                    <div className='w-full'>
                        <h1 className='text-center text-2xl font-bold text-neutral-600 mt-12 dark:text-white'>Quick Access is Empty</h1>
                    </div>

            }



            <div className='min-w-[35rem] '>
                <h1 className='text-gray-600 font-bold text-xl mt-16 dark:text-gray-50'>ALL FILES</h1>
                <div className={`${move.id ? '' : "hidden"} me-8 flex flex-row-reverse justify-between font-bold items-center mb-8`}>
                    <button className='flex items-center gap-2 bg-blue-500 dark:bg-neutral-700 text-white  p-2 px-4 rounded-full' onClick={paste}><span className='hidden lg:block'> Paste</span> <MdOutlineContentPaste /></button>
                </div>
                <Table data={searchedData} getData={getData} setData={setData} getQuickAccess={getQuickAccess} setQuickAccess={setQuickAccess} />
            </div>
            <NewFolder open={open} setOpen={setOpen} id={null} getData={getData} setData={setData} />
        </div>
    )
}
