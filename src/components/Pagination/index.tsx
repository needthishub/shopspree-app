import React, {useContext, useState} from 'react';
import {PaginationProps} from "./interface";
import './style.css';
import {Button} from "../../ui-components/Button";
import {ThemeContext} from "../../context/ThemeContext";

const Pagination: React.FC<PaginationProps> = ({overrideSelectedPage, onChange, numberOfPages}) => {
    const [selectedPage, setSelectedPage] = useState(1);
    const theme = useContext(ThemeContext);

    const currentSelectedPage = overrideSelectedPage || selectedPage;

    const handleLeftCaretClick = () => {
        const newPage = currentSelectedPage === 1 ? currentSelectedPage : currentSelectedPage - 1;

        setSelectedPage(newPage);
        onChange(newPage);
    };

    const handleRightCaretClick = () => {
        const newPage = currentSelectedPage === numberOfPages ? currentSelectedPage : currentSelectedPage + 1;
        setSelectedPage(newPage);
        onChange(newPage);
    };

    const pageClick = (page: number) => () => {
        if (selectedPage !== page) {
            setSelectedPage(page);
            onChange(page);
        }
    };

    const renderPageButtons = () => {
        return [...new Array(numberOfPages)].map((value, index) => {
            const page = index + 1;

            return (
                <Button
                    key={page}
                    selected={currentSelectedPage === page}
                    onClick={pageClick(page)}
                    className="page-button"
                >
                    {page}
                </Button>
            );
        });
    };

    return (
        <div className={`pagination-container ${theme}`}>
            <i onClick={handleLeftCaretClick} className="fas fa-caret-left page-caret"/>
            <div className="pages-container">
                {renderPageButtons()}
            </div>
            <i onClick={handleRightCaretClick} className="fas fa-caret-right page-caret"/>
        </div>
    );
};

export default Pagination;
