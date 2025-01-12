import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsThreeDotsVertical } from "react-icons/bs";
import { apicall } from '../../../utils/services';
import Delete from './Delete';
import Rename from './Rename';
export default function DropDown2({ id, type, getData, setData, prev_name, getQuickAccess, setQuickAccess }) {
    const [rename, setRename] = useState(false)
    const [remove, setRemove] = useState(false)
    const restoreFile = () => {
        apicall("patch", `file-manager/restore/${type}/`, '', { "folder_id": id }, (data) => {
            getData()
            toast.success(data.status)
        })
    }
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 text-xl rounded-md  dark:text-white bg-transparent px-3 font-semibold text-gray-900 ">
                    <BsThreeDotsVertical />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-neutral-700  shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    <MenuItem>
                        <div
                            className="block px-4 py-2 text-sm cursor-pointer text-gray-700 dark:text-white data-[focus]:bg-gray-100 data-[focus]:text-gray-900 dark:data-[focus]:text-gray-900 data-[focus]:outline-none"
                            onClick={restoreFile}
                        >
                            Restore
                        </div>
                    </MenuItem>
                    <MenuItem>
                        <div
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-white cursor-pointer data-[focus]:bg-gray-100 data-[focus]:text-gray-900 dark:data-[focus]:text-gray-900 data-[focus]:outline-none"
                            onClick={() => setRemove(true)}
                        >
                            Delete permanently
                        </div>
                    </MenuItem>
                </div>
            </MenuItems>
            <Rename rename={rename} setRename={setRename} id={id} type={type} getData={getData} setData={setData} prev_name={prev_name} />
            <Delete remove={remove} setRemove={setRemove} id={id} type={type} getData={getData} setData={setData} prev_name={prev_name} />
        </Menu>
    )
}
