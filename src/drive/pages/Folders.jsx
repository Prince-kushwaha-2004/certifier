import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaPlus } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineContentPaste } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { apicall } from '../../../utils/services';
import { removeMove } from '../../features/moveSlice';
import NewFolder from '../miniComponents/NewFolder';
import Table from '../miniComponents/Table';
export default function Folders() {
    let { id } = useParams();
    const [data, setData] = useState({})
    const [open, setOpen] = useState(false)
    const [searchedData, setSearchedData] = useState({})
    const { text } = useSelector(state => state.search)
    const move = useSelector(state => state.move)
    const dispatch = useDispatch()
    console.log(id)
    const getData = () => {
        apicall("get", "file-manager/", '', { folder_id: id }, (data) => {
            setData(data)
            setSearchedData(data)
        })
    }
    const removeQuickAccess = () => {
        id = Number(id)
        apicall("patch", `file-manager/quick-access/folder/`, '', { "folder_id": id }, (data) => {
            getData()
            toast.success(data.status)
        })
    }
    const paste = () => {
        id = Number(id)
        apicall("put", `file-manager/move/${move.type}/`, { "final_folder_id": id }, { "folder_id": move.id }, (data) => {
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
        getData()
    }, [id])
    return (
        <div className='px-8'>
            <div className='flex justify-between font-bold items-center mb-8 '>
                {data.parent_folder == null ?
                    <Link to="/home">
                        <button className='flex items-center gap-2 bg-blue-500 dark:bg-neutral-700 text-white  p-2 px-4 rounded-full'><span className='hidden lg:block'>Go Back</span> <IoArrowBack /></button>
                    </Link>
                    :
                    <Link to={`/home/Folders/${data.parent_folder}`}>
                        <button className='flex items-center gap-2 bg-blue-500 dark:bg-neutral-700 text-white  p-2 px-4 rounded-full'><span className='hidden lg:block'>Go Back</span> <IoArrowBack /></button>
                    </Link>
                }
                <div className='bg-blue-50 border hidden lg:block  p-2 rounded-full px-8'>
                    <Link to={`/home`}>
                        <span className='hover:text-blue-500'>Home</span>
                    </Link>
                    {data && data.path ?
                        data.path.map((value) => {
                            return (
                                <Link key={value.id} to={`/home/Folders/${value.id}`}>
                                    <span className='hover:text-blue-500'>/{value.name}</span>
                                </Link>
                            )
                        })
                        : ''}
                </div>
                {data.quick_access ? <button onClick={removeQuickAccess} className='flex items-center gap-2 bg-blue-500 dark:bg-neutral-700 text-white text-sm lg:text-[1rem] p-2 px-4 rounded-full '>Remove from Quick Access</button>
                    : ''}
                <button onClick={() => setOpen(true)} className='flex items-center gap-2 bg-blue-500 dark:bg-neutral-700 text-white  p-2 px-4 rounded-full'><span className='hidden lg:block'> New Folder</span> <FaPlus /></button>
            </div>
            <div className={`${move.id ? '' : "hidden"} flex flex-row-reverse justify-between font-bold items-center mb-8`}>
                <button className='flex items-center gap-2 bg-blue-500 dark:bg-neutral-700 text-white  p-2 px-4 rounded-full' onClick={paste}><span className='hidden lg:block'> Paste</span> <MdOutlineContentPaste /></button>
            </div>
            <Table data={searchedData} getData={getData} setData={setData} />
            <NewFolder open={open} setOpen={setOpen} id={id} getData={getData} setData={setData} />
        </div >
    )
}
