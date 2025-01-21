import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdDriveFileRenameOutline } from "react-icons/md";
import { apicall } from '../../../utils/services';
export default function Rename({ rename, setRename, id, type, getData, setData, prev_name }) {
    const [foldername, setFoldername] = useState(type == "folder" ? prev_name : prev_name.slice(0, -4))
    const renamefile = () => {
        if (foldername) {
            apicall("patch", `file-manager/rename/${type}/`, '', { "folder_id": id, "new_name": foldername }, (data) => {
                getData()
                toast.success(data.status)
            })
        } else {
            toast.error("Enter valid Folder name")
        }
        setRename(false)
        setFoldername(foldername)
    }
    return (
        <Dialog open={rename} onClose={setRename} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-400/40 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white dark:bg-neutral-700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex size-20 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 ">
                                    <MdDriveFileRenameOutline aria-hidden="true" className="size-12 text-blue-600" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900 dark:text-white">
                                        Rename
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <input type='text' value={foldername} onChange={(event) => setFoldername(event.target.value)} className="w-full my-auto border dark:bg-neutral-600 dark:border-neutral-700 dark:text-white text-black border-gray-300 text-xl p-2 px-4 gap-2 rounded-md focus:outline-blue-400" placeholder="New Folder" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-neutral-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={renamefile}
                                className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto"
                            >
                                Rename
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => setRename(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
