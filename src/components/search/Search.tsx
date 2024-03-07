import React, { ChangeEvent, useState } from "react";
import "./Search.css";
import cn from "classnames";
import { Input } from "components/ui/input/Input";
import { useDebounce } from "hooks/use-debounce";
import withLogger from "services/hoc/withLogger";
import { LOG_MESSAGE } from "config";
interface IsLoadingProps {
  on: () => void;
  off: () => void;
}
interface SearchProps {
  onChange: (search: string) => void;
  placeholder?: string;
  debounced?: boolean;
  loading?: IsLoadingProps;
  classNames?: string;
}
const SearchBase = ({
  onChange,
  placeholder = "Search",
  debounced = true,
  loading,
  classNames,
}: SearchProps) => {
  const [search, setSearch] = useState("");
  const handleOnChange = useDebounce(() => {
    onChange(search);
    loading?.off();
  });
  return (
    <div className={cn("Search", classNames)} data-testid="Search">
      <Input
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          loading?.on();
          const value = e.target.value;
          if (debounced) {
            setSearch(value);
            handleOnChange();
          } else {
            onChange(value);
            loading?.off();
          }
        }}
        logMessage={LOG_MESSAGE}
      />
    </div>
  );
};

export const Search = withLogger(SearchBase);
