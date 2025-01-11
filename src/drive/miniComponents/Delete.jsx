import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import { apicall } from '../../../utils/services';

export default function Delete({ remove, setRemove, id, type, getData, setData, prev_name }) {
    const removeFile = () => {
        apicall("patch", `file-manager/delete/${type}/`, '', { "folder_id": id }, (data) => {
            getData()
            toast.success(data.status)
        })
        setRemove(false)
    }

    return (
        <Dialog open={remove} onClose={setRemove} className="relative z-50">
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
                                <div className="mx-auto flex size-20 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 ">
                                    <MdDelete aria-hidden="true" className="size-12 text-red-500" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900 dark:text-white">
                                        Delete
                                    </DialogTitle>
                                    <h1 className='text-xl font-semibold text-neutral-600 dark:text-white mt-2'>Are you Sure you want to Delete <i>'{prev_name}'</i></h1>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-neutral-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={() => setRemove(false)}
                                className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm  sm:ml-3 sm:w-auto ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                No
                            </button>
                            <button
                                type="button"
                                onClick={removeFile}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:mt-0 sm:w-auto"
                            >
                                Delete
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
