import React from "react";
import Form from "next/form";
import SearchFormReset from "@/components/search-form-reset";
import { SearchIcon } from "lucide-react";

interface SearchFormProps {
    query?: string | null | undefined;
}

const SearchForm = ({ query = "" }: SearchFormProps) => {
    return (
        <Form action="/" scroll={false} className="search-form">
            <input
                name="query"
                className="search-input"
                defaultValue={query || ""}
                placeholder="Search startups..."
            />
            <div className="flex gap-2">
                {query && <SearchFormReset />}

                <button type="submit" className="search-btn">
                    <SearchIcon className="size-5" />
                </button>
            </div>
        </Form>
    );
};

export default SearchForm;
