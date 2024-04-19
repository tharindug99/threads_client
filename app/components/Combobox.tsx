"use client";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { HiCheck, HiChevronUpDown } from "react-icons/hi2";
const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

type OptionProps = {
  name: string;
  value: string;
};

type Props = {
  inputClassName?: string;
  items: OptionProps[];
  onChange: (value: OptionProps) => void;
  defaultOption?: OptionProps;
  value?: OptionProps;
  widthClassName?: string;
  placeholder?: string;
  disabled?: boolean;
};

export default function ComboBox({
  inputClassName,
  items,
  onChange,
  value,
  widthClassName,
  placeholder,
  disabled,
}: Props) {
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="">
      <Combobox value={value} onChange={onChange} disabled={disabled}>
        <div className={`relative ${widthClassName}`}>
          <div className="relative w-full cursor-default  text-left   focus:ring-0 focus:ring-transparent">
            <Combobox.Input
              className={`w-full border rounded-lg pr-5 pl-2 py-2 bg-gray-50 focus:ring-0 focus:ring-transparent ${inputClassName}`}
              displayValue={(item: OptionProps) => item.name}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder}
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-40 w-full overflow-auto text-left rounded-lg bg-white py-1 text-base shadow-lg">
              {filteredItems.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredItems.map((item: OptionProps) => (
                  <Combobox.Option
                    key={item.value}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block  ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <HiCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
