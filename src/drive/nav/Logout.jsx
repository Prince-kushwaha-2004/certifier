import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import toast from 'react-hot-toast';
import { BiSolidError } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { apicall } from '../../../utils/services';
import { logoutUser } from '../../features/userSlice';
export default function Logout({ open, setOpen }) {
    const dispatch = useDispatch()
    const logout = () => {
        setOpen(false)
        apicall("GET", "logout/", '', '', (data) => {
            dispatch(logoutUser())
            toast.success(data.status)
        })
    }
    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
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
                                <div className="mx-auto flex size-20 shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 ">
                                    <BiSolidError aria-hidden="true" className="size-12 text-yellow-500" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900 dark:text-white">
                                        Logout
                                    </DialogTitle>
                                    <h1 className='text-xl font-bold text-neutral-600 mt-2'>Are you Sure you want to logout</h1>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-neutral-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm  sm:ml-3 sm:w-auto ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                No
                            </button>
                            <button
                                type="button"
                                onClick={logout}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:mt-0 sm:w-auto"
                            >
                                Yes
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
