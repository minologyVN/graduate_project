import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import SvgEdit from "common/components/svg/Edit";
import SvgBin from "common/components/svg/Bin";
import SvgChevronDown from "common/components/svg/ChevronDown";

type OptionMenuCellProps<T extends object> = {
  value: T;
  onDelete: (value: T, archive: boolean) => void;
  onEdit: (value: T) => void;
  onRetrieve?: (value: T) => void;
  isArchived?: boolean;
};

export const OptionMenuCell = <T extends object>({
  value,
  onDelete,
  onEdit,
  isArchived,
  onRetrieve,
}: OptionMenuCellProps<T>): JSX.Element => (
  <div className="flex justify-center items-center h-full text-center text-sm">
    <div className="max-w-[140px] text-ellipsis">
      <div className="w-full">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-dark-red p-2 text-sm font-medium text-white hover:bg-light-red focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <SvgChevronDown className="" aria-hidden="true" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute z-modal right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                {isArchived ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "text-dark-red" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onRetrieve) {
                            onRetrieve(value);
                          }
                        }}
                      >
                        <SvgEdit className="mr-2 h-5 w-5" aria-hidden="true" />
                        Retrieve
                      </button>
                    )}
                  </Menu.Item>
                ) : (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "text-dark-red" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(value);
                        }}
                      >
                        <SvgEdit className="mr-2 h-5 w-5" aria-hidden="true" />
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                )}

                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "text-dark-red" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(value, !isArchived);
                      }}
                    >
                      <SvgBin className="mr-2 h-5 w-5" aria-hidden="true" />
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  </div>
);
